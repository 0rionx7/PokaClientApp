import { useNavigate, useLocation } from 'react-router-dom';

import { useSitDownChineseMutation } from '@chinese/api/chineseApi';
import { useSitDownMutation } from '@poka/api/pokaApi';
import { createTableTitleJsx } from '@utils/text-functions';
import Button from '@ui/Button';
import './ApprovedRequest.scss';

const ApprovedRequest = ({ requestInfo: { tableName, gameId } }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sitDownChinese] = useSitDownChineseMutation();
  const [sitDown] = useSitDownMutation();

  const isChinese = location?.pathname.includes('chinese');
  const table = isChinese ? ' κινέζικου πόκερ' : ' πόκας';

  const handleJoinTable = async _ => {
    if (isChinese) {
      const { data } = await sitDownChinese({ gameId, tableName });
      if (data?.gameId) navigate(`chinese/table/${gameId}`);
    } else {
      const { data } = await sitDown({ gameId, tableName });
      if (data?.gameId) navigate(`table/${gameId}`);
    }
  };

  return (
    <>
      {`Η αίτηση συμμετοχής σας για το τραπέζι ${table}`} <br />
      {createTableTitleJsx(tableName)} εγκρίθηκε.
      <span style={{ fontSize: '.7rem' }}>
        μπορείτε να καθήσετε οποιαδήποτε στιγμή επιθυμείτε, μέσω της λίστας
        ενεργών αιτήσεων ή αυτής των διαθέσιμων τραπεζιών
      </span>
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
