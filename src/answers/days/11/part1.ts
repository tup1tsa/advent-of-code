export type Direction = 'n' | 'ne' | 'se' | 's' | 'sw' | 'nw';

export interface Substitution {
  directions: [Direction, Direction];
  substitution: Direction | null;
}

interface RemoveDirections {
  (directions: Direction[], change: Substitution): Direction[];
}

interface SimplifyDirections {
  (
    directions: Direction[],
    substitutions: Substitution[],
    removeDirections: RemoveDirections
    ): Direction[];
}

interface ParseInput {
  (input: string): Direction[];
}

interface GetStepsCount {
  (
    directions: Direction[],
    simplifyDirections: SimplifyDirectionsFactory
  ): number;
}

export interface GetStepsCountFactory {
  (directions: Direction[]): number;
}

export interface SimplifyDirectionsFactory {
  (directions: Direction[]): Direction[];
}

export const removeDirections: RemoveDirections = (directions, change) => {
  const firstDirectionsCount = directions
    .filter(direction => direction === change.directions[0])
    .length;
  const secondDirectionsCount = directions
    .filter(direction => direction === change.directions[1])
    .length;
  const pairsNumber = Math.min(firstDirectionsCount, secondDirectionsCount);
  const leftoversCount = Math.abs(firstDirectionsCount - secondDirectionsCount);
  const leftoverDirection = firstDirectionsCount > secondDirectionsCount ? change.directions[0] : change.directions[1];
  const bareList = directions.filter(direction =>
    direction !== change.directions[0] && direction !== change.directions[1]
  );
  const leftOvers = Array(leftoversCount).fill(leftoverDirection);
  const pairs = change.substitution === null ? [] : Array(pairsNumber).fill(change.substitution);
  return [...bareList, ...leftOvers, ...pairs];
};

export const simplifyDirections: SimplifyDirections = (directions, substitutions, removeDirectionsFunc) => {
  let finished = false;
  let currentDirections = [...directions];
  while (!finished) {
    const directionsBefore = currentDirections.length;
    for (const substitution of substitutions) {
      currentDirections = removeDirectionsFunc(currentDirections, substitution);
    }
    if (directionsBefore === currentDirections.length) {
      finished = true;
    }
  }
  return currentDirections;
};

export const parseInput: ParseInput = input => {
  const possibleDirections: Direction[] = ['n', 'ne', 'se', 's', 'sw', 'nw'];
  const directions = input.split(',') as Direction[];
  if (directions.some((direction: Direction) => !possibleDirections.includes(direction))) {
    throw new Error('input is incorrect');
  }
  return directions;
};

export const getStepsCount: GetStepsCount = (directions, simplifyDirectionsFunc) =>
  simplifyDirectionsFunc(directions).length;

export const simplifyDirectionsFactory: SimplifyDirectionsFactory = directions => {
  const substitutions: Substitution[] = [
    { directions: ['n', 's'], substitution: null },
    { directions: ['n', 'se'], substitution: 'ne' },
    { directions: ['n', 'sw'], substitution: 'nw' },
    { directions: ['ne', 's'], substitution: 'se' },
    { directions: ['ne', 'sw'], substitution: null },
    { directions: ['ne', 'nw'], substitution: 'n' },
    { directions: ['se', 'nw'], substitution: null },
    { directions: ['se', 'sw'], substitution: 's' },
    { directions: ['nw', 's'], substitution: 'sw' },
  ];
  return simplifyDirections(directions, substitutions, removeDirections);
};

export const getStepsCountFactory: GetStepsCountFactory = directions =>
  getStepsCount(directions, simplifyDirectionsFactory);

export const day11Part1Factory = (input: string) => getStepsCountFactory(parseInput(input));