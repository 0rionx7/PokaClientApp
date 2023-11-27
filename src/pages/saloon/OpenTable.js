import { useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';

import { useOpenTableMutation } from 'features/gameStateSlice/gameApi';
import StartingCard from 'pages/saloon/StartingCard';
import Button from 'components/ui/Button';
import Reaction from 'pages/saloon/Reaction';
import './OpenTable.scss';

const OpenTable = () => {
  const playerName = useSelector(state => state.auth.username);
  const [openTable] = useOpenTableMutation();
  const navigate = useNavigate();

  const initialValues = {
    tableName: 'Table' + nanoid(3),
    startingCard: 7,
    cava: 5000,
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
    if (values.cava > 1000000)
      errors.openTable = 'Είναι πολλά τα λεφτά Άρη!\nΜέγιστη κάβα 1Μ';
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
              <div className="form-control">
                <Field name="startingCard">
                  {({ field }) => <StartingCard field={field} />}
                </Field>
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
              prompt="Άνοιγμα"
              disabled={isSubmitting || errors.openTable}
              className="green"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OpenTable;
