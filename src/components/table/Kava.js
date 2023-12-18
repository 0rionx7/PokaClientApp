const Kava = ({ kavaInfo }) => {
  if (kavaInfo) {
    const [[amount, names]] = Object.entries(kavaInfo);
    if (!+amount) return null;
    const kavaNames = names.map((name, i) => <span key={i}> {name}</span>);
    return (
      <div className="pot">
        {amount} {kavaNames}
      </div>
    );
  } else return null;
};

export default Kava;
