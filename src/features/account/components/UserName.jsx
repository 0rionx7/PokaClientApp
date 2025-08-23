import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectUserName } from '@account/api/accountApi';
import EditUsername from '@account/components/EditUsername';
import { editSvg } from 'assets/svgs/various';
import classes from './UserName.module.scss';

const UserName = () => {
  const playerName = useSelector(selectUserName);
  const [edit, setEdit] = useState(false);

  if (edit) return <EditUsername stopEditing={() => setEdit(false)} />;

  return (
    <div className={classes['flex-center']}>
      {playerName}
      <div onClick={() => setEdit(!edit)} className={classes['edit-btn']}>
        {editSvg} Αλλαγή ονόματος.
      </div>
    </div>
  );
};

export default UserName;
