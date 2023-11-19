import { Field } from 'formik';

import './CheckBox.scss';

const CheckBox = ({ value, name, label, style, checked, className, info }) => {
  return (
    <label
      className={'form-control ' + (className ? className : '')}
      style={style}>
      {label || value}
      <Field
        type="checkbox"
        className="checkbox"
        name={name}
        value={value}
        checked={checked}
      />
      {info && <div className="tool-tip">{info}</div>}
    </label>
  );
};

export default CheckBox;
