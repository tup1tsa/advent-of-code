import { day1Part1Factory } from './days/1/part1';
import { day1Part2Factory } from './days/1/part2';
import { day2Part1Factory } from './days/2/part1';
import { day2Part2Factory } from './days/2/part2';
import { day3Part1Factory } from './days/3/part1';
import { day3Part2Factory } from './days/3/part2';
import { day4Part1Factory } from './days/4/part1';
import { day4Part2Factory } from './days/4/part2';

export const answersWrappers = {
  day1: {
    part1: day1Part1Factory,
    part2: day1Part2Factory,
  },
  day2: {
    part1: day2Part1Factory,
    part2: day2Part2Factory
  },
  day3: {
    part1: day3Part1Factory,
    part2: day3Part2Factory
  },
  day4: {
    part1: day4Part1Factory,
    part2: day4Part2Factory
  }
};