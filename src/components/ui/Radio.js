import { Field } from 'formik';

import ToolTip from 'components/ui/ToolTip';

const Radio = ({ name, label, value, checked, info }) => {
  return (
    <label className="form-control">
      {label || value}
      <Field
        type="radio"
        className="checkbox"
        name={name}
        value={value}
        checked={checked}
      />
      {info && <ToolTip info={info} />}
    </label>
  );
};

export default Radio;
