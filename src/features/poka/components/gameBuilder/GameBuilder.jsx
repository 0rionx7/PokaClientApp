import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';

import {
  BUILDER_ROW_TITLE,
  SPEAKING_ORDER,
  TABLOS,
} from '@utils/text-constants';
import {
  selectSittingPlayers,
  selectSittingPlayersWithMoney,
  useSetGameVariantMutation,
} from '@poka/api/pokaApi';
import { useRoomContext } from '@poka/components/RoomContext';
import { useGameBuilderContext } from '@poka/components/gameBuilder/useGameBuilderContext';
import BuilderRow from '@poka/components/gameBuilder/BuilderRow';
import GameChooser from '@poka/components/gameBuilder/GameChooser';
import WinningOrder from '@poka/components/gameBuilder/WinningOrder';
import Dilemma from '@poka/components/gameBuilder/Dilemma';
import HandCardsInPlay from '@poka/components/gameBuilder/HandCardsInPlay';
import FaceDown from '@poka/components/gameBuilder/FaceDown';
import CardsCount from '@poka/components/gameBuilder/CardsCount';
import Extra from '@poka/components/gameBuilder/Extra';
import Options from '@poka/components/gameBuilder/Options';
import Dealing from '@poka/components/gameBuilder/Dealing';
import useSnackBar from '@hooks/useSnackBar';
import Button from '@ui/Button';
import Frame from '@ui/Frame';
import './GameBuilder.scss';

const GameBuilder = () => {
  const sittingPlayers = useSelector(selectSittingPlayers);
  const activePlayers = useSelector(selectSittingPlayersWithMoney);
  const [setGameVariant, { isSuccess }] = useSetGameVariantMutation();
  const { snackElement, setSnackInfo } = useSnackBar();
  const { actionContainerNode } = useRoomContext();
  const { values, status, setStatus } = useGameBuilderContext();

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ pending: true });
    const result = await setGameVariant({ builderConfig: values });
    if (result?.error?.data) {
      setStatus({ error: result.error.data });
      return setSnackInfo(result.error.data);
    }
    setStatus({});
  }

  const noOthersInPlay = sittingPlayers.length === 1;
  const allOthersTapi = activePlayers.length === 1;
  const btnPrompt =
    (allOthersTapi && 'Μόνο ένας παίκτης έχει χρήματα') ||
    (noOthersInPlay && 'Δεν κάθετε άλλος παίκτης στο τραπέζι') ||
    status.error ||
    'ΜΟΙΡΑΣΤΕ';

  return (
    <Frame className="game-builder">
      <form
        id="builderForm"
        onSubmit={handleSubmit}
        onFocus={() => setStatus({})}>
        {snackElement}
        <BuilderRow title={BUILDER_ROW_TITLE.GAME} element={<GameChooser />} />
        <BuilderRow
          title={BUILDER_ROW_TITLE.WINNING_ORDER}
          element={<WinningOrder />}
        />
        <BuilderRow title={BUILDER_ROW_TITLE.EXTRA} element={<Extra />} />
        <BuilderRow
          title={BUILDER_ROW_TITLE.TABLO}
          element={
            <Dilemma name="tablo" options={[TABLOS.MONO, TABLOS.DIPLO]} />
          }
        />
        <BuilderRow
          title={BUILDER_ROW_TITLE.CARDS_PER_LEG}
          element={<CardsCount name="cornerLength" />}
        />
        <BuilderRow
          title={BUILDER_ROW_TITLE.RAILROAD_LENGTH}
          element={<CardsCount name="railroadLength" />}
        />
        <BuilderRow
          title={BUILDER_ROW_TITLE.OPTIONS}
          element={<Options key={values.gameName} />}
        />
        <BuilderRow
          title={BUILDER_ROW_TITLE.CARDS_IN_HAND}
          element={<CardsCount name="cardsInHand" />}
        />
        <BuilderRow
          title={BUILDER_ROW_TITLE.FACE_DOWN}
          element={<FaceDown />}
        />
        <BuilderRow
          title={BUILDER_ROW_TITLE.SPEAKS}
          element={
            <Dilemma
              name="speaks"
              options={[SPEAKING_ORDER.BY_VALUE, SPEAKING_ORDER.BY_SEAT]}
            />
          }
        />
        <BuilderRow
          title={BUILDER_ROW_TITLE.HAND_CARDS_IN_PLAY}
          element={<HandCardsInPlay />}
        />
        <Dealing key={values.gameName} />
        {actionContainerNode &&
          createPortal(
            <Button
              form="builderForm"
              prompt={btnPrompt ?? status.error ?? 'ΜΟΙΡΑΣΤΕ'}
              disabled={
                status.pending ||
                isSuccess ||
                status.error ||
                allOthersTapi ||
                noOthersInPlay
              }
              className="deal-btn"
            />,
            actionContainerNode
          )}
      </form>
    </Frame>
  );
};

export default GameBuilder;
