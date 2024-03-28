import ListedPlayer from 'componentsChinese/dealer/ListedPlayer';
import './ListedPlayers.scss';

const ListedPlayers = ({ playersStateList, title }) => {
  return (
    <div className="listed-players">
      <h4>{title}</h4>
      {playersStateList.map(playerState => (
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
