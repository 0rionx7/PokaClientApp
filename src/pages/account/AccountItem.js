import classes from './Account.module.scss';

const AccountItem = ({ title, element, style }) => {
  return (
    <div className="frame-item" style={style}>
      <div className={classes.title}> {title}</div>
      <div className={classes.content}> {element}</div>
    </div>
  );
};

export default AccountItem;
