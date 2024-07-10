import { redirect } from 'next/navigation'

type Props = {}

const TravelsEmptyPage = (props: Props) => redirect('/')

export default TravelsEmptyPage