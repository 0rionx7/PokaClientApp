const Kava = ({ kavaInfo }) => {
  const { amount, players } = kavaInfo;

  const kavaPlayers = players.map((name, i) => <span key={i}> {name}</span>);

  return (
    <div className="pot">
      {amount} {kavaPlayers}
    </div>
  );
};

export default Kava;
