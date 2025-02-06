// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import TeamCard from '../TeamCard'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiContentResponse = {
  initially: 'INITIAL',
  in_progress: 'INPROGRESS',
  isFailed: 'ISFAILED',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {blogList: [], status: apiContentResponse.initially}

  componentDidMount() {
    this.setState({status: apiContentResponse.in_progress})
    this.teamsApiUrl()
  }

  teamsApiUrl = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    if (response.ok) {
    const data = await response.json()
    const {teams} = data
    // console.log(teams)
    const getIplTeams = teams.map(each => ({
      id: each.id,
      name: each.name,
      teamImageUrl: each.team_image_url,
    }))
    this.setState({blogList: getIplTeams, status: apiContentResponse.success})
    } else {
      this.setState({status: apiContentResponse.isFailed})
    }
  }

  loadingView = () => (
    <div className="home-container">
      <div testid="loader" className="loader">
        <Loader type="Oval" color="#00BFFF" height={50} width={50} />
      </div>
    </div>
  )

  isFailedView = () => (
    <div className="home-container">
      <div className="loader">
        <h1>Some thing went Wrong!</h1>
      </div>
    </div>
  )

  successView = () => {
    const {blogList} = this.state
    return (
      <div className="home-container">
        <div className="card-container">
          <div className="homeHeading">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="logo"
            />
            <h1>IPL Dashboard</h1>
          </div>
          <ul className="home-team-list">
            {blogList.map(each => (
              <TeamCard teamList={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderResponse = () => {
    const {status} = this.state
    switch (status) {
      case apiContentResponse.in_progress:
        return this.loadingView()
      case apiContentResponse.isFailed:
        return this.isFailedView()
      case apiContentResponse.success:
        return this.successView()
      default:
        return this.loadingView()
    }
  }

  render() {
    return <>{this.renderResponse()}</>
  }
}
export default Home
