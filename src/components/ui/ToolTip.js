const ToolTip = ({ info, children }) => {
  return (
    <div className="tool-tip">
      {info}
      {children}
    </div>
  );
};

export default ToolTip;
