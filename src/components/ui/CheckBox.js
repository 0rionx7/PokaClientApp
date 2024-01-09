import { Field } from 'formik';

import ToolTip from 'components/ui/ToolTip';
import './CheckBox.scss';

const CheckBox = ({ value, name, label, style, checked, className, info }) => {
  return (
    <label
      className={'form-control ' + (className ? className : '')}
      style={style}>
      <div>{label || value}</div>
      <Field
        type="checkbox"
        className="checkbox"
        name={name}
        value={value}
        checked={checked}
      />
      {info && <ToolTip info={info} />}
    </label>
  );
};

export default CheckBox;
