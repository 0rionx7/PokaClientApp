import ToolTip from 'components/ui/ToolTip';
import './CheckBox.scss';

const CheckBox = ({ value, name, label, style, checked, className, info }) => {
  console.log(checked);
  return (
    <label
      className={'form-control ' + (className ? className : '')}
      style={style}>
      <div>{label || value}</div>
      <input
        type="checkbox"
        className="checkbox"
        name={name}
        defaultChecked={checked}
      />
      {info && <ToolTip info={info} />}
    </label>
  );
};
export default CheckBox;
