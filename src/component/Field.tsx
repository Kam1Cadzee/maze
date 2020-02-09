import React from 'react';
import styled from 'styled-components';
import { STEP_SIZE } from '../core/Game';
import { useConfigContext } from '../core/ConfigContext';

const Field = styled.div`
  border-radius: 5px;
  background-color: ${props => props.color};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const MapFieldsComponent: any = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(
    ${(props: any) => props.COUNT_FIELDS},
    ${(props: any) => props.FIELD_SIZE}px
  );
  grid-template-rows: repeat(
    ${(props: any) => props.COUNT_FIELDS},
    ${(props: any) => props.FIELD_SIZE}px
  );
  grid-gap: ${(props: any) => 24 / props.COUNT_FIELDS}px;
  margin-bottom: 16px;
`;

export const MapFields = (props: any) => {
  const { COUNT_FIELDS, FIELD_SIZE } = useConfigContext();

  return <MapFieldsComponent {...{ COUNT_FIELDS, FIELD_SIZE }} {...props} />;
};

const MapDirectionComponent: any = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props: any) => props.COUNT_STEPS / 2},
    ${STEP_SIZE}px
  );
  grid-template-rows: repeat(2, ${STEP_SIZE}px);
  grid-gap: ${(props: any) => 48 / props.COUNT_STEPS}px;
`;

export const MapDirection = (props: any) => {
  const { COUNT_STEPS } = useConfigContext();
  return <MapDirectionComponent {...{ COUNT_STEPS }} {...props} />;
};

const ItemInnerFieldComponent: any = styled(Field)`
  position: absolute;
  margin: 0;
  width: ${(props: any) => props.FIELD_SIZE}px;
  height: ${(props: any) => props.FIELD_SIZE}px;
  left: ${({ left }: any) => left}px;
  top: ${({ top }: any) => top}px;
  svg {
    height: ${(props: any) => props.FIELD_SIZE / 2}px;
    width: ${(props: any) => props.FIELD_SIZE / 2}px;
  }
`;

export const ItemInnerField = (props: any) => {
  const { FIELD_SIZE, splitNumber, COUNT_FIELDS } = useConfigContext();
  const { row, column } = splitNumber(props.number);
  const grip = 24 / COUNT_FIELDS;
  const left = column * FIELD_SIZE + grip * column;
  const top = row * FIELD_SIZE + grip * row;

  return <ItemInnerFieldComponent {...{ FIELD_SIZE, left, top }} {...props} />;
};

export const FieldMap = styled(Field)`
  border: 1px solid #0000002e;
`;
export const FieldDirection = styled(Field)`
  border: 1px dashed black;
  cursor: pointer;
`;
