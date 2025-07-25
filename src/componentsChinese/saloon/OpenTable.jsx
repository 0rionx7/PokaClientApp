import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';

import { useOpenTableChineseMutation } from 'features/gameStateChinese/gameStateApi';
import { selectPlayername } from 'features/account/accountSlice';
import Button from 'components/ui/Button';
import { createCode } from 'utils/utilities-functions';

const OpenTable = () => {
  const playerName = useSelector(selectPlayername);
  const [openTable] = useOpenTableChineseMutation();
  const navigate = useNavigate();

  const initialValues = {
    tableName: '',
    initialPlayTime: 120,
  };
  const validate = values => {
    let errors = {};
    if (
      values.tableName.trim().length < 3 ||
      values.tableName.trim().length > 17
    )
      errors.openTable = `Το όνομα τραπεζιού πρέπει να αποτελείται\n από 3 εώς 17 χαρακτήρες.`;
    return errors;
  };
  const submitHandler = async (values, { setErrors }) => {
    const tableName = values.tableName + '_' + playerName + '_' + createCode(6);
    const result = await openTable({ ...values, tableName });
    if (result?.error?.data) setErrors({ openTable: result.error.data });
    else navigate(`/chinese/table/${result.data.gameId}`);
  };

  return (
    <div className="open-table">
      <div className="title">
        <h3>Δημιουργία Τραπεζιού</h3>
      </div>
      <Formik
        key="openTable"
        initialValues={initialValues}
        onSubmit={submitHandler}
        validate={validate}
        validateOnChange={false}
        validateOnBlur={false}>
        {({ isSubmitting, errors, setErrors }) => (
          <Form onFocus={() => setErrors({})}>
            <div className="form-inputs">
              <div className="form-control">
                <label htmlFor="tableName">Όνομα τραπεζιού</label>
                <Field
                  id="tableName"
                  name="tableName"
                  type="text"
                  placeholder="εισάγετε ένα όνομα"
                />
              </div>
              <div className="form-control">
                <label htmlFor="initialPlayTime">Play Time (sec)</label>
                <Field
                  id="initialPlayTime"
                  name="initialPlayTime"
                  type="number"
                />
              </div>
            </div>
            <span>{errors.openTable}</span>
            <Button
              prompt="Δημιουργία"
              disabled={isSubmitting || errors.openTable}
              className="orange"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OpenTable;
