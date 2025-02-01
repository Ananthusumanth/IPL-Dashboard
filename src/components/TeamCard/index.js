// Write your code here
import './index.css'
import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {teamList} = props
  const {id, name, teamImageUrl} = teamList

  return (
    <li>
      <Link to={`/team-matches/${id}`} className="list-container">
        <img src={teamImageUrl} alt={name} className="teamName" />
        <p>{name}</p>
      </Link>
    </li>
  )
}
export default TeamCard
