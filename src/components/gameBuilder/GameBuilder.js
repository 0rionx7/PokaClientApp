import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';

import {
  builderTitles,
  dealingOrders,
  errorMessages,
  speaking,
  tabloCount,
} from 'common/text-constants';
import {
  useGetGameStateQuery,
  useSetGameVariantMutation,
} from 'features/gameState/gameStateApi';
import { isHere, notEnoughCards } from 'common/utilities-functions';
import { createGameVariant } from 'lib/createGameVariant';
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
import { builderDefaults, gameNames } from 'common/games';
import useSnackBar from 'hooks/useSnackBar';
import Button from 'components/ui/Button';
import Frame from 'components/ui/Frame';
import './GameBuilder.scss';

const GameBuilder = () => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  const [setGameVariant, { isSuccess }] = useSetGameVariantMutation();
  const { snackElement, setSnackInfo } = useSnackBar();
  const [domReady, setDomReady] = useState(false);

  const playersCount = data.playersStateList.filter(isHere).length;
  const noOthersInPlay = data.playersStateList.filter(isHere).length === 1;
  const allOthersTapi =
    data.playersStateList.filter(state => state.resta > 0 && !state.sittingOut)
      .length === 1;

  useEffect(() => setDomReady(true), []);

  let btnPrompt;
  if (noOthersInPlay) btnPrompt = 'Δεν κάθετε άλλος παίκτης στο τραπέζι';
  else if (allOthersTapi) btnPrompt = 'Μόνο ένας παίκτης έχει χρήματα';

  const initialValues = {
    gameName: gameNames.MAMUT,
    ...builderDefaults,
    startingCard: data.startingCard,
  };
  const validate = values => {
    const errors = {};
    if (notEnoughCards(values, playersCount))
      errors.buildGame = errorMessages.NO_CARDS;
    if (values.deny && values.denies < 1)
      errors.buildGame = errorMessages.ARNISI;
    if (values.swap && values.swaps < 1) errors.buildGame = errorMessages.ALAGI;
    if (!values.handCardsInPlay.length) errors.buildGame = errorMessages.HAND;
    setSnackInfo(errors.buildGame);
    return errors;
  };

  const submitHandler = async (values, { setErrors }) => {
    const gameVariant = createGameVariant(values);
    const result = await setGameVariant({ gameId, gameInfo: gameVariant });
    if (result?.error?.data) {
      setErrors({ buildGame: result.error.data });
      setSnackInfo(result.error.data);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submitHandler}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize>
      {({ isSubmitting, isValid, errors, submitForm, setErrors }) => (
        <Form onFocus={() => setErrors({})}>
          {snackElement}
          <Frame>
            <BuilderItem
              title={builderTitles.GAME}
              element={<GameChooser startingCard={data.startingCard} />}
            />
            <BuilderItem
              title={builderTitles.WINNING_ORDER}
              element={<WinningOrder />}
            />
            <BuilderItem title={builderTitles.EXTRA} element={<Extra />} />
            <BuilderItem
              title={builderTitles.TABLO}
              element={
                <Dilemma
                  name="tablo"
                  options={[tabloCount.MONO, tabloCount.DIPLO]}
                />
              }
            />
            <BuilderItem
              title={builderTitles.CARDS_PER_LEG}
              element={<CardsCount name="cornerLength" />}
            />
            <BuilderItem
              title={builderTitles.RAILROAD_LENGTH}
              element={<CardsCount name="railroadLength" />}
            />
            <BuilderItem title={builderTitles.OPTIONS} element={<Options />} />
            <BuilderItem
              title={builderTitles.CARDS_IN_HAND}
              element={<CardsCount name="cardsInHand" />}
            />
            <BuilderItem
              title={builderTitles.FACE_DOWN}
              element={<FaceDown />}
            />
            <BuilderItem
              title={builderTitles.SPEAKS}
              element={
                <Dilemma
                  name="speaks"
                  options={[speaking.BY_VALUE, speaking.BY_SEAT]}
                />
              }
            />
            <BuilderItem
              title={builderTitles.HAND_CARDS_IN_PLAY}
              element={<HandCardsInPlay />}
            />
            <BuilderItem
              title={builderTitles.DEALING}
              element={
                <Dilemma
                  name="dealing"
                  options={[dealingOrders.ENA_ENA, dealingOrders.OLA_MAZI]}
                />
              }
            />
            <BuilderItem
              title={builderTitles.DEALING_OPTIONS}
              element={<DealingOptions />}
            />
            {domReady &&
              createPortal(
                <Button
                  prompt={
                    btnPrompt || (isValid ? 'ΜΟΙΡΑΣΤΕ' : errors.buildGame)
                  }
                  disabled={
                    isSubmitting ||
                    isSuccess ||
                    !isValid ||
                    allOthersTapi ||
                    noOthersInPlay
                  }
                  onClick={submitForm}
                  className="deal-btn"
                />,
                document.getElementsByClassName('action-container')[0]
              )}
          </Frame>
        </Form>
      )}
    </Formik>
  );
};

export default GameBuilder;
