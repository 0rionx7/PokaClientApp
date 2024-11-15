const Kava = ({ kavaInfo }) => {
  const { amount, players } = kavaInfo;

  const kavaPlayers = players.map((name, i) => <span key={i}> {name}</span>);

  return (
    <div className="kava">
      {amount.toLocaleString()} {kavaPlayers}
    </div>
  );
};

export default Kava;
