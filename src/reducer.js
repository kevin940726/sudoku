import { handleActions } from 'redux-actions';

const reducer = handleActions({
  INSERT: (state, action) => ({
    ...state,
    game: state.game.insert(action.payload.pos, action.payload.num),
  }),

  INSERT_NOTE: (state, action) => ({
    ...state,
    game: state.game.insertNote(action.payload.pos, action.payload.num),
  }),

  CLEAR_NOTES: (state, action) => ({
    ...state,
    game: state.game.clearNotes(action.payload),
  }),

  NEW_GAME: (state) => ({
    ...state,
    game: state.game.new(),
  }),

  FIND_CANDIDATES: (state, action) => ({
    ...state,
    candidates: state.game.findCandidates(state.game.board, action.payload),
  }),
}, {

});

export default reducer;
