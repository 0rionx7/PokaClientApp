import ListedPlayer from '@chinese/components/dealer/ListedPlayer';

const ListedPlayers = ({ playerStates, title }) => {
  return (
    <div className="listed-players">
      <h4>{title}</h4>
      {playerStates.map(playerState => (
        <ListedPlayer
          key={playerState?.playerName}
          playerState={playerState}
          clickable={title === 'Αιτούντες συμμετοχής'}
        />
      ))}
    </div>
  );
};

export default ListedPlayers;
