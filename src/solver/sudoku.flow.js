/* @flow */
import kudoku from './kudoku';
import { EventEmitter } from 'eventemitter3';

export type BoardInput = string | Array<number | string>;

export type Answer = {
  ans: Array<number>,
  count: number,
};

export type Answers = Array<Answer>;

export type Note = {
  [num: number]: boolean,
};

export type Notes = Array<Note>;

export type SudokuObjectLiteral = {
  board: string,
  _solver: kudoku,
  _problem: string,
  answers: Answers,
  notes: Notes,
  isSolved: boolean,
  _timer: number,
  time: number,
  _emitter: EventEmitter,
};
