import ToolTip from 'components/ui/ToolTip';

const Radio = ({ label, info, ...rest }) => {
  return (
    <label className="form-control">
      <div>{label || rest.value}</div>
      <input type="radio" className="checkbox" {...rest} />
      {info && <ToolTip info={info} />}
    </label>
  );
};

export default Radio;
