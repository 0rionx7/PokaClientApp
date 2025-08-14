import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';

import { builderRowTitle, speakingOrder, tablos } from '@utils/text-constants';
import {
  selectPlayerStates,
  useSetGameVariantMutation,
} from '@poka/api/pokaApi';
import { isSitting } from '@utils/helper-functions';
import { useActionContainerNode } from '@poka/utils/ActionContainerContext';
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

const GameBuilder = memo(() => {
  const { gameId } = useParams();
  const playerStates = useSelector(selectPlayerStates(gameId));
  const [setGameVariant, { isSuccess }] = useSetGameVariantMutation();
  const { snackElement, setSnackInfo } = useSnackBar();
  const { actionContainerNode } = useActionContainerNode();
  const { values, status, setStatus } = useGameBuilderContext();

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ pending: true });
    const result = await setGameVariant({ gameId, builderConfig: values });
    if (result?.error?.data) {
      setStatus({ error: result.error.data });
      return setSnackInfo(result.error.data);
    }
    setStatus({});
  }

  const noOthersInPlay = playerStates.filter(isSitting).length === 1;
  const allOthersTapi =
    playerStates.filter(state => state.resta > 0 && !state.sittingOut)
      .length === 1;

  let btnPrompt;
  if (allOthersTapi) btnPrompt = 'Μόνο ένας παίκτης έχει χρήματα';
  if (noOthersInPlay) btnPrompt = 'Δεν κάθετε άλλος παίκτης στο τραπέζι';

  return (
    <Frame className="game-builder">
      <form
        id="builderForm"
        onSubmit={handleSubmit}
        onFocus={() => setStatus({})}>
        {snackElement}
        <BuilderRow title={builderRowTitle.GAME} element={<GameChooser />} />
        <BuilderRow
          title={builderRowTitle.WINNING_ORDER}
          element={<WinningOrder />}
        />
        <BuilderRow title={builderRowTitle.EXTRA} element={<Extra />} />
        <BuilderRow
          title={builderRowTitle.TABLO}
          element={
            <Dilemma name="tablo" options={[tablos.MONO, tablos.DIPLO]} />
          }
        />
        <BuilderRow
          title={builderRowTitle.CARDS_PER_LEG}
          element={<CardsCount name="cornerLength" />}
        />
        <BuilderRow
          title={builderRowTitle.RAILROAD_LENGTH}
          element={<CardsCount name="railroadLength" />}
        />
        <BuilderRow
          title={builderRowTitle.OPTIONS}
          element={<Options key={values.gameName} />}
        />
        <BuilderRow
          title={builderRowTitle.CARDS_IN_HAND}
          element={<CardsCount name="cardsInHand" />}
        />
        <BuilderRow title={builderRowTitle.FACE_DOWN} element={<FaceDown />} />
        <BuilderRow
          title={builderRowTitle.SPEAKS}
          element={
            <Dilemma
              name="speaks"
              options={[speakingOrder.BY_VALUE, speakingOrder.BY_SEAT]}
            />
          }
        />
        <BuilderRow
          title={builderRowTitle.HAND_CARDS_IN_PLAY}
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
});

export default GameBuilder;
