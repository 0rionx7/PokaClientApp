import { useActionState, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useOpenChineseTableMutation } from '@chinese/api/chineseApi';
import { selectUserName } from '@account/api/accountApi';
import { createCode } from '@utils/helper-functions';
import { describeTime } from '@utils/text-functions';
import Button from '@ui/Button';

const OpenTable = () => {
  const playerName = useSelector(selectUserName);
  const [openTable] = useOpenChineseTableMutation();
  const [formState, formAction, isPending] = useActionState(openTableAction, {
    tableName: '',
    playTime: 120,
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const validate = name => {
    if (name.trim().length < 3 || name.trim().length > 17)
      return `Το όνομα τραπεζιού πρέπει να αποτελείται\n από 3 εώς 17 χαρακτήρες.`;
  };

  async function openTableAction(_prevFormState, formData) {
    const tableData = Object.fromEntries(formData.entries());
    const error = validate(tableData.tableName);
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
    navigate(`/chinese/table/${result.data.gameId}`, {
      state: { game: 'chinese' },
    });
  }

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
          <div className="form-control">
            <label htmlFor="playTime">Χρόνος παιχνιδιού</label>
            <select id="playTime" name="playTime" defaultValue={120}>
              {[120, 180, 300].map(secs => (
                <option key={secs} value={secs}>
                  {describeTime(secs)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <span>{error}</span>
        <Button
          prompt="Δημιουργία"
          disabled={isPending || error}
          className="orange"
        />
      </form>
    </div>
  );
};

export default OpenTable;
