import Chips from '@poka/components/player/Chips'

const Stack = ({ chipInfo }) => {
  const [color, chips] = chipInfo

  return (
    <div className={color}>
      <Chips chips={chips} />
    </div>
  )
}

export default Stack
