// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import {Link} from 'react-router-dom'
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
    status: apiContentResponse.initially,
  }

  componentDidMount() {
    this.setState({status: apiContentResponse.in_progress})
    this.teamMatchesApiUrl()
  }

  teamMatchesApiUrl = async () => {
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
    let totalWin = 0
    let totalLost = 0
    let totalDraw = 0
    recentMatches.forEach(each => {
      if (each.match_status === 'Won') {
        totalWin += 1
      } else if (each.match_status === 'Lost') {
        totalLost += 1
      } else {
        totalDraw += 1
      }
    })

    const data = [
      {
        id: 1,
        count: totalWin,
        text: 'WON',
      },
      {
        id: 2,
        count: totalLost,
        text: 'LOST',
      },
      {
        id: 3,
        count: totalDraw,
        text: 'DRAW',
      },
    ]

    return (
      <div className="teamMatch-container">
        <div className="team-card">
          <img src={teamBannerUrl} alt="team banner" className="banner" />
          <p>Latest Matches</p>
          <div className="latest-matchdiv">
            <LatestMatch latestmatchDetails={latestMatchDetails} />
          </div>
          <ul className="ul-cards">
            {recentMatches.map(each => (
              <MatchCard recentMatches={each} key={each.id} />
            ))}
          </ul>
        </div>
        <PieChart width={1000} height={300}>
          <Pie
            cx="70%"
            cy="40%"
            data={data}
            startAngle={0}
            endAngle={360}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell
              name={`WON - ${data.find(each => each.id === 1)?.count}`}
              fill="#fecba6"
            />
            <Cell
              name={`LOST - ${data.find(each => each.id === 2)?.count}`}
              fill="#b3d23f"
            />
            <Cell
              name={`DRAW - ${data.find(each => each.id === 3)?.count}`}
              fill="white"
            />
          </Pie>
          <Legend
            iconType="circle"
            layout="vertical"
            verticalAlign="middle"
            align="middle"
          />
        </PieChart>
        <div className="backButton-container">
          <Link to="/">
            <button type="button" className="backButton">
              Back
            </button>
          </Link>
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

export default TeamMatches
