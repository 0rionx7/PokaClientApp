import { useNavigate } from 'react-router-dom';

import { useSitDownMutation } from 'features/gameState/gameStateApi';
import { createTableTitle } from 'common/text-functions';
import Button from 'components/ui/Button';
import './ApprovedRequest.scss';

const ApprovedRequest = ({ requestInfo: { gameId, tableName } }) => {
  const [sitDown] = useSitDownMutation();
  const navigate = useNavigate();

  const joinHandler = async _ => {
    const { data } = await sitDown({ gameId, tableName });
    if (data?.gameId) navigate(`/table/${gameId}`);
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
