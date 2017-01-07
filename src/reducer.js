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
}, {

});

export default reducer;
