// Write your code here
import './index.css'

const MatchCard = props => {
  const {recentMatches} = props
  const updatesDetails = {
    competingTeamLogo: recentMatches.competing_team_logo,
    id: recentMatches.id,
    competingTeam: recentMatches.competing_team,
    matchStatus: recentMatches.match_status,
    result: recentMatches.result,
  }

  const classNamecolor =
    updatesDetails.matchStatus === 'Lost' ? 'red-color' : 'green-color'

  return (
    <li className="recent-list-container" key={updatesDetails.id}>
      <img
        src={updatesDetails.competingTeamLogo}
        alt={`competing team ${updatesDetails.competingTeam}`}
        className="Recentteamlogo"
      />
      <p>{updatesDetails.competingTeam}</p>
      <p>{updatesDetails.result}</p>
      <p className={classNamecolor}>{updatesDetails.matchStatus}</p>
    </li>
  )
}

export default MatchCard
