import { useSelector } from 'react-redux'
import { useGetUserByIdQuery } from '../slices/userApiSlice'

export const GoalCreator = ({ userId }) => {
  const creator = useSelector(state =>
    state.users.find(user => user._id === userId)
  )

  return <span>by {creator ? creator.username : 'Unknown author'}</span>
}