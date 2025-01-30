// Write your code here
import './index.css'

const LatestMatch = props => {
  const {latestmatchDetails} = props
  const updatedLatestResults = {
    umpires: latestmatchDetails.umpires,
    result: latestmatchDetails.result,
    manOfTheMatch: latestmatchDetails.man_of_the_match,
    id: latestmatchDetails.id,
    date: latestmatchDetails.date,
    venue: latestmatchDetails.venue,
    competingTeam: latestmatchDetails.competing_team,
    competingTeamLogo: latestmatchDetails.competing_team_logo,
    firstInnings: latestmatchDetails.first_innings,
    secondInnings: latestmatchDetails.second_innings,
  }

  const {
    umpires,
    result,
    manOfTheMatch,
    id,
    date,
    venue,
    competingTeam,
    competingTeamLogo,
    firstInnings,
    secondInnings,
  } = updatedLatestResults

  return (
    <div className="latest-container" key={id}>
      <div className="latest-details-left">
        <p>{competingTeam}</p>
        <p>{date}</p>
        <p>{venue}</p>
        <p>{result}</p>
      </div>
      <div className="latest-img">
        <img
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
          className="latestmatchlogo"
        />
      </div>
      <div className="latest-details-right">
        <p>First Innings</p>
        <p>{firstInnings}</p>
        <p>Second Innings</p>
        <p>{secondInnings}</p>
        <p>Man Of The Match</p>
        <p>{manOfTheMatch}</p>
        <p>Umpires</p>
        <p>{umpires}</p>
      </div>
    </div>
  )
}
export default LatestMatch
