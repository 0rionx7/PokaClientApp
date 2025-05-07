import ToolTip from 'components/ui/ToolTip';
import './CheckBox.scss';

const CheckBox = ({ value, label, style, className, info, ...rest }) => {
  return (
    <label
      className={'form-control ' + (className ? className : '')}
      style={style}>
      <div>{label || value}</div>
      <input type="checkbox" className="checkbox" value={value} {...rest} />
      {info && <ToolTip info={info} />}
    </label>
  );
};

export default CheckBox;
