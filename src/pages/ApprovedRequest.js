import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setGameInfo } from 'features/gameStateSlice/gameStateSlice';
import { useSitDownMutation } from 'features/gameStateSlice/gameApi';
import { createTableTitle } from 'common/text-functions';
import Button from 'components/ui/Button';
import './ApprovedRequest.scss';

const ApprovedRequest = ({ gameId, tableName }) => {
  const [sitDown] = useSitDownMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const joinHandler = async _ => {
    const { data } = await sitDown({ gameId });
    if (!data?.gameId) return;
    dispatch(setGameInfo(data));
    navigate(`/table/${data.gameId}`);
  };

  return (
    <>
      Η αίτηση συμμετοχής σας για το τραπέζι <br />
      {createTableTitle(tableName)} εγκρίθηκε.
      <span style={{ fontSize: '.7rem' }}>
        (μπορείτε να καθήσετε οποιαδήποτε στιγμή επιθυμείτε, μέσω της λίστας
        ενεργών αιτήσεων ή αυτής των διαθέσιμων τραπεζιών)
      </span>
      <div className="action-btns">
        <Button className="green" prompt="κάθομαι τώρα" onClick={joinHandler} />
        <Button className="red" prompt="θα καθήσω αργότερα" />
      </div>
    </>
  );
};

export default ApprovedRequest;
