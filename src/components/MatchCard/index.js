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

  const {competingTeam, competingTeamLogo, result, id, matchStatus} =
    updatesDetails

  const classNamecolor = matchStatus === 'Lost' ? 'red-color' : 'green-color'

  return (
    <li className="recent-list-container" key={id}>
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="Recentteamlogo"
      />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p className={classNamecolor}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
