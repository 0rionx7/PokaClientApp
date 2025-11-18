import classes from './Account.module.scss'

const AccountRow = ({ title, element, style }) => {
  return (
    <div className="frame-row" style={style}>
      <div className={classes.title}> {title}</div>
      <div className={classes.content}> {element}</div>
    </div>
  )
}

export default AccountRow
