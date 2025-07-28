import { memo, useActionState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { createPortal } from 'react-dom';

import {
  builderTitle,
  dealingType,
  errorMessage,
  speakingOrder,
  tablo,
} from 'utils/text-constants';
import {
  useGetGameStateQuery,
  useSetGameVariantMutation,
} from 'features/gameState/gameStateApi';
import { isSeated, notEnoughCards } from 'utils/utilities-functions';
import { useActionContainerNode } from 'utils/ActionContainerContext';
import { useGameBuilderContext } from 'hooks/useGameBuilderContext';
import { createGameInfo } from 'utils/createGameInfo';
import BuilderItem from 'components/gameBuilder/BuilderItem';
import GameChooser from 'components/gameBuilder/GameChooser';
import DealingOptions from 'components/gameBuilder/DealingOptions';
import WinningOrder from 'components/gameBuilder/WinningOrder';
import Dilemma from 'components/gameBuilder/Dilemma';
import HandCardsInPlay from 'components/gameBuilder/HandCardsInPlay';
import FaceDown from 'components/gameBuilder/FaceDown';
import CardsCount from 'components/gameBuilder/CardsCount';
import Extra from 'components/gameBuilder/Extra';
import Options from 'components/gameBuilder/Options';
import useSnackBar from 'hooks/useSnackBar';
import Button from 'components/ui/Button';
import Frame from 'components/ui/Frame';
import './GameBuilder.scss';

const GameBuilder = memo(() => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  const [setGameVariant, { isSuccess }] = useSetGameVariantMutation();
  const { snackElement, setSnackInfo } = useSnackBar();
  const { actionContainerNode } = useActionContainerNode();
  const { values } = useGameBuilderContext();
  const [formState, formAction, isPending] = useActionState(builderAction, {
    errors: {},
  });
  const inPLayRef = useRef();

  async function builderAction(_prevFormState, formData) {
    const builderData = Object.fromEntries(formData.entries());
    const handCardsInPlay = inPLayRef.current
      ? formData.getAll('handCardsInPlay')
      : values.handCardsInPlay;
    const faceDownIndexes = formData.getAll('faceDownIndexes');
    const data = {
      ...values,
      ...builderData,
      handCardsInPlay,
      faceDownIndexes,
    };
    const error = validate(data);
    if (error) return setSnackInfo(error);

    const gameInfo = createGameInfo(data);
    const result = await setGameVariant({ gameId, gameInfo });
    if (result?.error?.data) setSnackInfo(result.error.data);
  }
  function validate(values) {
    if (notEnoughCards(values, playersCount)) return errorMessage.STARTINGCARD;
    if (!values.handCardsInPlay.length) return errorMessage.HAND;
  }

  const playersCount = data.playerStates.filter(isSeated).length;
  const noOthersInPlay = data.playerStates.filter(isSeated).length === 1;
  const allOthersTapi =
    data.playerStates.filter(state => state.resta > 0 && !state.sittingOut)
      .length === 1;

  let btnPrompt;
  if (noOthersInPlay) btnPrompt = 'Δεν κάθετε άλλος παίκτης στο τραπέζι';
  else if (allOthersTapi) btnPrompt = 'Μόνο ένας παίκτης έχει χρήματα';

  const isValid = !formState?.buildGame;

  return (
    <Frame className="game-builder">
      <form id="builderForm" action={formAction}>
        {snackElement}
        <BuilderItem title={builderTitle.GAME} element={<GameChooser />} />
        <BuilderItem
          title={builderTitle.WINNING_ORDER}
          element={<WinningOrder />}
        />
        <BuilderItem title={builderTitle.EXTRA} element={<Extra />} />
        <BuilderItem
          title={builderTitle.TABLO}
          element={<Dilemma name="tablo" options={[tablo.MONO, tablo.DIPLO]} />}
        />
        <BuilderItem
          title={builderTitle.CARDS_PER_LEG}
          element={<CardsCount name="cornerLength" />}
        />
        <BuilderItem
          title={builderTitle.RAILROAD_LENGTH}
          element={<CardsCount name="railroadLength" />}
        />
        <BuilderItem title={builderTitle.OPTIONS} element={<Options />} />
        <BuilderItem
          title={builderTitle.CARDS_IN_HAND}
          element={<CardsCount name="cardsInHand" />}
        />
        <BuilderItem title={builderTitle.FACE_DOWN} element={<FaceDown />} />
        <BuilderItem
          title={builderTitle.SPEAKS}
          element={
            <Dilemma
              name="speaks"
              options={[speakingOrder.BY_VALUE, speakingOrder.BY_SEAT]}
            />
          }
        />
        <BuilderItem
          ref={inPLayRef}
          title={builderTitle.HAND_CARDS_IN_PLAY}
          element={<HandCardsInPlay />}
        />
        <BuilderItem
          title={builderTitle.DEALING}
          element={
            <Dilemma
              key={values.deny}
              name="dealing"
              options={[dealingType.ENA_ENA, dealingType.OLA_MAZI]}
            />
          }
        />
        <BuilderItem
          title={builderTitle.DEALING_OPTIONS}
          element={<DealingOptions />}
        />
        {actionContainerNode &&
          createPortal(
            <Button
              form="builderForm"
              prompt={
                btnPrompt || (isValid ? 'ΜΟΙΡΑΣΤΕ' : formState.errors.buildGame)
              }
              disabled={
                isPending ||
                isSuccess ||
                !isValid ||
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
