import { useNavigate } from 'react-router-dom';

import { useSitDownChineseMutation } from '@chinese/api/chineseApi';
import { useSitDownMutation } from '@poka/api/pokaApi';
import { createTableTitleJsx } from '@utils/text-functions';
import Button from '@ui/Button';
import './ApprovedRequest.scss';

const ApprovedRequest = ({ requestInfo: { tableName, gameId, game } }) => {
  const navigate = useNavigate();
  const [sitDownChinese] = useSitDownChineseMutation();
  const [sitDown] = useSitDownMutation();

  const table = game === 'poka' ? 'πόκας' : 'κινέζικου πόκερ';

  const handleJoinTable = async _ => {
    if (game === 'poka') {
      const { data } = await sitDown({ gameId, tableName });
      if (data?.gameId) navigate('poka-table', { state: { game: 'poka' } });
    } else {
      const { data } = await sitDownChinese({ gameId, tableName });
      if (data?.gameId)
        navigate(`chinese/table/${gameId}`, { state: { game: 'chinese' } });
    }
  };

  return (
    <>
      {`Η αίτηση συμμετοχής σας για το τραπέζι ${table}`} <br />
      {createTableTitleJsx(tableName)} εγκρίθηκε.
      <section style={{ fontSize: '.7rem' }}>
        μπορείτε να καθήσετε οποιαδήποτε στιγμή επιθυμείτε, μέσω της λίστας
        ενεργών αιτήσεων ή αυτής των διαθέσιμων τραπεζιών
      </section>
      <div className="action-btns">
        <Button
          className="green"
          prompt="κάθομαι τώρα"
          onClick={handleJoinTable}
        />
        <Button className="red" prompt="θα καθήσω αργότερα" />
      </div>
    </>
  );
};

export default ApprovedRequest;
