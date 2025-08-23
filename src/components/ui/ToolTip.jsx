import { selectHideInfo } from '@account/slice/accountSlice';
import { useSelector } from 'react-redux';

const ToolTip = ({ info, children }) => {
  const hideInfo = useSelector(selectHideInfo);
  const alwaysShow = info === 'ΑΡΝΗΣΕΙΣ' || info.includes('αλλαγές');

  if (hideInfo && !alwaysShow) return null;

  return (
    <div className="tool-tip">
      {info}
      {children}
    </div>
  );
};

export default ToolTip;
