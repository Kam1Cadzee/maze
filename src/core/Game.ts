import randomInt from 'random-int';

export const STEP_SIZE = 30;

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

interface IPart {
  direction: Direction;
  max: number;
}
export class Game {
  private _startPosition: number = 0;
  private _finishPosition: number = -1;
  private _path: Direction[] = [];
  private _currentStep: number = 0;
  private COUNT_FIELDS: number = 3;
  private COUNT_STEPS: number = 10;

  private _parts: IPart[];

  constructor() {
    this._parts = [
      {
        direction: Direction.UP,
        max: 0,
      },

      {
        direction: Direction.DOWN,
        max: 0,
      },

      {
        direction: Direction.LEFT,
        max: 0,
      },

      {
        direction: Direction.RIGHT,
        max: 0,
      },
    ];
    this.start(this.COUNT_FIELDS, this.COUNT_STEPS);
  }

  private splitNumber = (number: number) => {
    const row = Math.floor(number / this.COUNT_FIELDS);
    const column = number % this.COUNT_FIELDS;
    return {
      row,
      column,
    };
  };

  private generate = () => {
    const currentPosition = this.splitNumber(this._startPosition);
    const refillPart = Math.floor(this.COUNT_STEPS / 2);
    for (let i = 0; i < this.COUNT_STEPS; i++) {
      if (i % refillPart === 0)
        this.fillPart(currentPosition.row, currentPosition.column);

      const step = this.getStep(currentPosition);

      if (step === Direction.UP) currentPosition.row--;
      else if (step === Direction.DOWN) currentPosition.row++;
      else if (step === Direction.RIGHT) currentPosition.column++;
      else currentPosition.column--;

      this._path.push(step);
    }

    this._finishPosition =
      currentPosition.row * this.COUNT_FIELDS + currentPosition.column;
  };

  private getStep = (position: { column: number; row: number }) => {
    const random = randomInt(0, this._parts[3].max);
    const step = this._parts.find(item => random <= item.max)!.direction;

    if (step === Direction.UP) {
      return position.row - 1 < 0 ? Direction.DOWN : Direction.UP;
    } else if (step === Direction.DOWN) {
      return position.row + 1 >= this.COUNT_FIELDS
        ? Direction.UP
        : Direction.DOWN;
    } else if (step === Direction.LEFT) {
      return position.column - 1 < 0 ? Direction.RIGHT : Direction.LEFT;
    } else {
      return position.column + 1 >= this.COUNT_FIELDS
        ? Direction.LEFT
        : Direction.RIGHT;
    }
  };

  private fillPart = (row: number, column: number) => {
    const top = row;
    const bottom = this.COUNT_FIELDS - row - 1;

    const left = column;
    const right = this.COUNT_FIELDS - column - 1;

    const x = (this.COUNT_FIELDS - 1) * 2;

    let lastNumber = Math.ceil((top * 100) / x);
    this._parts[0].max = lastNumber;

    lastNumber += Math.ceil((bottom * 100) / x);
    this._parts[1].max = lastNumber;

    lastNumber += Math.ceil((left * 100) / x);
    this._parts[2].max = lastNumber;

    lastNumber += Math.ceil((right * 100) / x);
    this._parts[3].max = lastNumber;
  };

  start = (COUNT_FIELDS: number, COUNT_STEPS: number) => {
    this.COUNT_FIELDS = COUNT_FIELDS;
    this.COUNT_STEPS = COUNT_STEPS;

    this._finishPosition = -1;
    this._path = [];
    this._currentStep = 0;
    this._startPosition = randomInt(
      0,
      this.COUNT_FIELDS * this.COUNT_FIELDS - 1,
    );
    this.generate();
  };

  get finish() {
    return this._finishPosition;
  }

  get startPosition() {
    return this._startPosition;
  }

  next = () => {
    if (this._currentStep === this.COUNT_STEPS) return null;
    return this._path[this._currentStep++];
  };
}
