import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useOpenPokaTableMutation } from '@poka/api/pokaApi';
import { selectUserName } from '@account/slice/accountSlice';
import clockwise from '@icons/clockwise.svg';
import { createCode } from '@utils/helper-functions';
import Reaction from '@poka/components/saloon/Reaction';
import Button from '@ui/Button';
import Radio from '@ui/Radio';
import { useActionState, useState } from 'react';
import './OpenTable.scss';

const initialValues = {
  tableName: '',
  rotation: 'clockwise',
  cava: 1000,
  chip: 1,
  reaction: 101,
};

const OpenTable = () => {
  const playerName = useSelector(selectUserName);
  const [formState, formAction, isPending] = useActionState(
    openTableAction,
    initialValues
  );
  const [error, setError] = useState(null);
  const [openTable] = useOpenPokaTableMutation();
  const navigate = useNavigate();

  async function openTableAction(_prevFormState, formData) {
    const tableData = Object.fromEntries(formData.entries());
    const error = validate(tableData);
    if (error) {
      setError(error);
      return tableData;
    }
    const tableName =
      tableData.tableName + '_' + playerName + '_' + createCode(6);
    const result = await openTable({ ...tableData, tableName });
    if (result?.error?.data) {
      setError(result.error.data);
      return tableData;
    }
    navigate(`/poka/table/${result.data.gameId}`, { state: { game: 'poka' } });
  }
  const validate = values => {
    if (
      values.tableName.trim().length < 3 ||
      values.tableName.trim().length > 17
    )
      return `Το όνομα τραπεζιού πρέπει να αποτελείται\n από 3 εώς 17 χαρακτήρες.`;
    if (+values.chip > +values.cava)
      return 'Το "τσίπ" είναι μεγαλύτερο από την κάβα.\n';
    if (values.cava <= 0 || values.chip <= 0)
      return 'Δεν επιτρέπονται αρνητικές τιμές\n';
    if (values.cava > 1_000_000) return 'Μέγιστη κάβα 1Μ';
  };

  return (
    <div className="open-table">
      <div className="title">
        <h3>Δημιουργία Τραπεζιού</h3>
      </div>
      <form action={formAction} onFocus={() => setError(null)}>
        <div className="form-inputs">
          <div className="form-control">
            <label htmlFor="tableName">Όνομα τραπεζιού</label>
            <input
              id="tableName"
              name="tableName"
              type="text"
              placeholder="εισάγετε ένα όνομα"
              defaultValue={formState.tableName}
            />
          </div>
          <div className="rotation">
            <div>Φορά μοιράσματος</div>
            <Radio
              name="rotation"
              label={<img src={clockwise} alt="clockwise" />}
              value="clockwise"
              defaultChecked={true}
            />
            <Radio
              name="rotation"
              label={
                <img
                  src={clockwise}
                  alt="counterclockwise"
                  style={{ transform: 'rotateY(180deg)' }}
                />
              }
              value="counterclockwise"
            />
          </div>
          <div className="form-control">
            <label htmlFor="cava">&quot;Κάβα&quot;</label>
            <input
              id="cava"
              name="cava"
              type="number"
              defaultValue={formState.cava}
            />
          </div>
          <div className="form-control">
            <label htmlFor="chip">&quot;Τσίπ&quot;</label>
            <input
              id="chip"
              name="chip"
              type="number"
              defaultValue={formState.chip}
            />
          </div>
          <div className="form-control">
            <Reaction />
          </div>
        </div>
        <span>{error}</span>
        <Button
          prompt="Δημιουργία"
          className="orange"
          disabled={isPending || error}
        />
      </form>
    </div>
  );
};

export default OpenTable;
