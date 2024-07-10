import React from 'react'
import { Badge } from './ui/badge'
import { SquareArrowOutUpRightIcon } from 'lucide-react'

type Props = {
  text: string
  onClick?: () => void
}

const SearchExampleBadge = (props: Props) => {
  return (
    <Badge variant="secondary" className="px-4 py-2 font-semibold text-sm bg-muted" onClick={props.onClick}>
      <span>{props.text}</span>
      <SquareArrowOutUpRightIcon size={16} className="ml-2"/>
    </Badge>
  )
}

export default SearchExampleBadge