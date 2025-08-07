import { selectHideInfo } from '@account/slice/accountSlice';
import { useSelector } from 'react-redux';

const ToolTip = ({ info, children }) => {
  const hideInfo = useSelector(selectHideInfo);

  if (hideInfo && info !== 'ΑΡΝΗΣΕΙΣ' && !info.includes('αλλαγές')) return null;

  return (
    <div className="tool-tip">
      {info}
      {children}
    </div>
  );
};

export default ToolTip;
