import ToolTip from 'ui/ToolTip';
import './CheckBox.scss';

const CheckBox = ({ label, style, className, info, ...rest }) => {
  return (
    <label className={`form-control ${className ?? ''}`} style={style}>
      <div>{label || rest.value}</div>
      <input type="checkbox" className="checkbox" {...rest} />
      {info && <ToolTip info={info} />}
    </label>
  );
};

export default CheckBox;
