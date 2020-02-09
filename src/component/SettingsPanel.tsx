import React, { useState } from 'react';
import styled from 'styled-components';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/all';
import { useConfigContext } from '../core/ConfigContext';

const Panel: any = styled.div`
  border: 1px solid black;
  position: absolute;
  right: -1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateX(${({ show }: any) => (show ? '0' : '100%')});
  padding: 8px 16px;
  transition: transform 300ms;
`;

const Toggle = styled.div`
  position: absolute;
  width: 20px;
  height: calc(100% + 2px);
  background-color: black;
  top: -1px;
  left: 0;
  transform: translateX(-100%);
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    fill: white;
  }
`;

const Button = styled.button`
  border: 1px solid black;
  border-radius: 3px;
  padding: 4px 8px;
  cursor: pointer;
`;

const Input = styled.input`
  font-size: 1rem;
  border: 1px solid black;
  margin-bottom: 8px;
  padding: 2px 8px;
`;

interface ISettingsPanelProps {
  win: number;
  count: number;
  restart: any;
  show: boolean;
  setShow: any;
}

const SettingsPanel = ({
  win,
  count,
  restart,
  show,
  setShow,
}: ISettingsPanelProps) => {
  const { COUNT_FIELDS, COUNT_STEPS } = useConfigContext();
  const [countFields, setCountFields] = useState(COUNT_FIELDS);
  const [countSteps, setCountSteps] = useState(COUNT_STEPS);

  const handleChangeCountFields = (e: any) => {
    const value = +e.target.value;
    if (value >= 3 && value <= 18) setCountFields(value);
  };

  const handleChangeCountSteps = (e: any) => {
    const value = +e.target.value;
    if (value >= 10 && value <= 30) setCountSteps(value);
  };

  return (
    <Panel show={show}>
      <p>
        {win} / {count}
      </p>
      <Input
        type={'number'}
        value={countFields}
        onChange={handleChangeCountFields}
        max={18}
        min={3}
      />
      <Input
        type={'number'}
        step={2}
        value={countSteps}
        onChange={handleChangeCountSteps}
        min={10}
        max={30}
      />
      <Button onClick={() => restart(countFields, countSteps)}>Restart</Button>
      <Toggle onClick={setShow}>
        {show ? <IoMdArrowDropright /> : <IoMdArrowDropleft />}
      </Toggle>
    </Panel>
  );
};

export default SettingsPanel;
