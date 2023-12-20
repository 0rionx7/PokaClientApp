import { Field } from 'formik';

import ToolTip from 'components/ui/ToolTip';
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
      {info && <ToolTip info={info} />}
    </label>
  );
};

export default Radio;
