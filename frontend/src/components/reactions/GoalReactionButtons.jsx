import { reactionAdded } from '../../slices/goalsSlice'
import { useDispatch } from 'react-redux'

const reactionEmoji = {
    thumbsUp: '👍',
    bicep: '💪🏽',
    heart: '❤️',
    fire: '🔥',
    star: '⭐️'
  }
  
const GoalReactionButtons = ({ goal }) => {
    
    const dispatch = useDispatch()

    const goalReactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
      return (
        <li key={name}>
        <button 
            key={name} 
            type="button" 
            className="muted-button reaction-button"
            onClick={() =>
                dispatch(reactionAdded({ goalId: goal._id, reaction: name}))
            }
        >
          {emoji} {goal.reactions[name]}
        </button>
        </li>
      )
    })
  
    return <ul className= 'flex flex-row'>{goalReactionButtons}</ul>
  }

export default GoalReactionButtons