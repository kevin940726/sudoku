import { createAction } from 'redux-actions';

export const insert = createAction('INSERT', (pos, num) => ({ pos, num }));

export const insertNote = createAction('INSERT_NOTE', (pos, num) => ({ pos, num }));

export const clearNotes = createAction('CLEAR_NOTES');

export const newGame = createAction('NEW_GAME');

export const findCandidates = createAction('FIND_CANDIDATES');
