import { Field } from 'formik';
import './Radio.scss';

const Radio = ({ name, className, label, value, checked, info }) => {
  return (
    <label className="form-control">
      {label || value}
      <Field
        type="radio"
        className={className}
        name={name}
        value={value}
        checked={checked}
      />
      {info && <span className="tool-tip">{info}</span>}
    </label>
  );
};

export default Radio;
