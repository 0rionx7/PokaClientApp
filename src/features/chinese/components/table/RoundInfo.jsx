import classes from './Table.module.scss'

const RoundInfo = ({ round }) => {
  return (
    <h2 className={classes['round']}>
      <div>Round</div>
      <div>{round}</div>
    </h2>
  )
}

export default RoundInfo
