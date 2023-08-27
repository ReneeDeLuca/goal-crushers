import { parseISO, formatDistanceToNow } from 'date-fns'

const TimeAgo = ({ timestamp }) => {
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }

  return (
    <span className='text-xs text-gray-800 italic basis-1/4' title={timestamp}>
      {timeAgo}
    </span>
  )
}

export default TimeAgo