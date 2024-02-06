import { useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';

import { useOpenTableMutation } from 'features/gameState/gameStateApi';
import { clockwise, counterclockwise } from 'assets/svgs/various';
import Dilemma from 'components/gameBuilder/Dilemma';
import Reaction from 'pages/saloon/Reaction';
import Button from 'components/ui/Button';
import './OpenTable.scss';

const OpenTable = () => {
  const playerName = useSelector(state => state.account.username);
  const [openTable] = useOpenTableMutation();
  const navigate = useNavigate();

  const initialValues = {
    tableName: 'Table' + nanoid(3),
    rotation: 'clockwise',
    cava: 1000,
    chip: 1,
    reaction: 30,
  };
  const validate = values => {
    let errors = {};
    if (!values.tableName.trim().length)
      errors.openTable = 'Πρέπει να δώσετε ένα όνομα στο τραπέζι.\n';
    if (values.chip > values.cava)
      errors.openTable = 'Το "τσίπ" είναι μεγαλύτερο από την κάβα.\n';
    if (values.cava <= 0 || values.chip <= 0)
      errors.openTable = 'Δεν επιτρέπονται αρνητικές τιμές\n';
    if (values.cava > 1000000) errors.openTable = 'Μέγιστη κάβα 1Μ';
    return errors;
  };
  const submitHandler = async (values, { setErrors }) => {
    const tableName = values.tableName + '_' + playerName + '_' + nanoid(5);
    const result = await openTable({ ...values, tableName });
    if (result?.error?.data?.includes('duplicate'))
      setErrors({ openTable: 'Το όνομα αυτό χρησιμοποιείται' });
    else if (result?.error?.data) setErrors({ openTable: result.error.data });
    else navigate(`/table/${result.data.gameId}`);
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
                <Field id="tableName" name="tableName" type="text" />
              </div>
              <div className="rotation">
                <div>Φορά μοιράσματος</div>
                <Dilemma
                  name="rotation"
                  options={[
                    { name: 'clockwise', img: clockwise },
                    { name: 'counterclockwise', img: counterclockwise },
                  ]}
                />
              </div>
              <div className="form-control">
                <label htmlFor="cava">&quot;Κάβα&quot;</label>
                <Field id="cava" name="cava" type="number" />
              </div>
              <div className="form-control">
                <label htmlFor="chip">&quot;Τσίπ&quot;</label>
                <Field id="chip" name="chip" type="number" />
              </div>
              <div className="form-control">
                <Field name="reaction">
                  {({ field }) => <Reaction field={field} />}
                </Field>
              </div>
            </div>
            <span>{errors.openTable}</span>
            <Button
              type="submit"
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
