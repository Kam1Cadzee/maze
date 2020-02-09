import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  FaRegArrowAltCircleDown,
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleUp,
  FaMapMarkerAlt,
  FaAward,
} from 'react-icons/fa';
import {
  FieldDirection,
  FieldMap,
  ItemInnerField,
  MapDirection,
  MapFields,
} from '../Field';
import { Direction, Game } from '../../core/Game';
import { AiFillDislike, AiFillLike } from 'react-icons/all';
import SettingsPanel from '../SettingsPanel';
import { useConfigContext } from '../../core/ConfigContext';

const Title = styled.h1`
  color: black;
  text-align: center;
  padding: 0 16px;
  align-self: center;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

enum StatusGame {
  WIN,
  LOSE,
  UNDEFINED,
}

const Icon = (props: any) => {
  const { direction } = props;
  if (direction === Direction.UP) {
    return <FaRegArrowAltCircleUp />;
  } else if (direction === Direction.DOWN) return <FaRegArrowAltCircleDown />;
  else if (direction === Direction.LEFT) return <FaRegArrowAltCircleLeft />;
  else return <FaRegArrowAltCircleRight />;
};

const StartPage = () => {
  const { COUNT_FIELDS, setCOUNT_FIELDS, setCOUNT_STEPS } = useConfigContext();
  const game = useMemo(() => new Game(), []);

  const [steps, setSteps] = useState([] as Direction[]);
  const [enabledField, setEnabledField] = useState(false);
  const [statusGame, setStatusGame] = useState(StatusGame.UNDEFINED);
  const [selectNumber, setSelectNumber] = useState(-1);
  const [showPanel, setShowPanel] = useState(false);
  const [win, setWin] = useState(0);
  const [games, setGames] = useState(0);

  useEffect(() => {
    const getNextStep = () => {
      const step = game.next();

      if (step !== null) {
        steps.push(step);
        setSteps([...steps]);
      } else {
        setEnabledField(true);
      }
    };
    setTimeout(() => getNextStep(), 100);
  }, [game, steps]);

  const handleFinish = (number: number) => {
    if (!enabledField || statusGame !== StatusGame.UNDEFINED) return;

    if (game.finish === number) {
      setStatusGame(StatusGame.WIN);
      setWin(win => win + 1);
    } else {
      setStatusGame(StatusGame.LOSE);
      setGames(count => count + 1);
    }
    setSelectNumber(number);
    setShowPanel(true);
  };

  const handleRestart = (countFields: number, countSteps: number) => {
    if (statusGame === StatusGame.UNDEFINED) return;

    setCOUNT_STEPS(countSteps);
    setCOUNT_FIELDS(countFields);

    setSteps([]);
    setStatusGame(StatusGame.UNDEFINED);
    setEnabledField(false);
    setSelectNumber(-1);
    game.start(countFields, countSteps);
  };

  return (
    <Main>
      <Title>Лабиринт</Title>
      <SettingsPanel
        win={win}
        count={games}
        restart={handleRestart}
        show={showPanel}
        setShow={() => setShowPanel(show => !show)}
      />
      <MapFields>
        {Array(COUNT_FIELDS * COUNT_FIELDS)
          .fill('')
          .map((item, index) => {
            return <FieldMap onClick={() => handleFinish(index)} />;
          })}
        {statusGame === StatusGame.UNDEFINED && (
          <ItemInnerField
            number={game.startPosition}
            onClick={() => handleFinish(game.startPosition)}
          >
            <FaMapMarkerAlt />
          </ItemInnerField>
        )}
        {statusGame === StatusGame.WIN && (
          <ItemInnerField number={selectNumber}>
            <FaAward />
          </ItemInnerField>
        )}
        {statusGame === StatusGame.LOSE && (
          <>
            <ItemInnerField number={game.finish}>
              <AiFillLike />
            </ItemInnerField>
            <ItemInnerField number={selectNumber}>
              <AiFillDislike />
            </ItemInnerField>
          </>
        )}
      </MapFields>
      <MapDirection>
        {steps.map((item, index) => {
          return (
            <FieldDirection>
              <Icon direction={item} />
            </FieldDirection>
          );
        })}
      </MapDirection>
    </Main>
  );
};

export default StartPage;
