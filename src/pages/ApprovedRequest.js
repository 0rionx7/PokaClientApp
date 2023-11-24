import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useRequestJoinMutation } from 'features/gameApi/gameStateMutations/useRequestJoinMutation';
import { setGameInfo } from 'features/gameStateSlice/gameStateSlice';
import { createTableTitle } from 'common/text-functions';
import Button from 'components/ui/Button';
import './ApprovedRequest.scss';

const ApprovedRequest = ({ tableName }) => {
  const [requestJoin] = useRequestJoinMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const joinHandler = async _ => {
    const { data } = await requestJoin({ tableName });
    if (!data) return;
    console.log(data);
    const { id, ...gameInfo } = data;
    dispatch(setGameInfo(gameInfo));
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
