import { useSelector } from 'react-redux';

const ToolTip = ({ info, children }) => {
  const hideInfo = useSelector(state => state.account.hideInfo);

  if (hideInfo) return null;
  return (
    <div className="tool-tip">
      {info}
      {children}
    </div>
  );
};

export default ToolTip;
