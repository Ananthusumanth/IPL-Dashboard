// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiContentResponse = {
  initially: 'INITIAL',
  in_progress: 'INPROGRESS',
  isFailed: 'ISFAILED',
  success: 'SUCCESS',
}

class TeamMatches extends Component {
  state = {
    teamPlayList: {},
    isLoading: true,
    status: apiContentResponse.initially,
  }

  componentDidMount() {
    this.setState({status: apiContentResponse.in_progress})
    this.getteamPlayList()
  }

  getteamPlayList = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    if (response.ok) {
      const data = await response.json()
      const updatedteamList = {
        teamBannerUrl: data.team_banner_url,
        latestMatchDetails: data.latest_match_details,
        recentMatches: data.recent_matches,
      }
      this.setState({
        teamPlayList: updatedteamList,
        status: apiContentResponse.success,
      })
    } else {
      this.setState({status: apiContentResponse.isFailed})
    }
  }

  isFailedView = () => (
    <div className="home-container">
      <div className="loader">
        <h1>Some thing went Wrong!</h1>
      </div>
    </div>
  )

  loadingView = () => (
    <div className="home-container">
      <div testid="loader" className="loader">
        <Loader type="Oval" color="#00BFFF" height={50} width={50} />
      </div>
    </div>
  )

  successView = () => {
    const {teamPlayList} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamPlayList

    return (
      <div className="teamMatch-container">
        <div className="team-card">
          <img src={teamBannerUrl} alt="team banner" className="banner" />
          <p>Latest Matches</p>
          <div className="latest-matchdiv">
            <LatestMatch
              latestmatchDetails={latestMatchDetails}
              key={latestMatchDetails.id}
            />
          </div>
          <ul className="ul-cards">
            {recentMatches.map(each => (
              <MatchCard recentMatches={each} key={each.id} />
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
    }
  }

  render() {
    return <>{this.renderResponse()}</>
  }
}

export default TeamMatches
