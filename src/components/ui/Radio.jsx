import ToolTip from 'components/ui/ToolTip';

const Radio = ({ label, value, info, ...rest }) => {
  return (
    <label className="form-control">
      <div>{label || value}</div>
      <input type="radio" className="checkbox" value={value} {...rest} />
      {info && <ToolTip info={info} />}
    </label>
  );
};

export default Radio;
