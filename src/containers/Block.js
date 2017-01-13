import { connect } from 'react-redux';
import Block from '../components/Block';
import { findCandidates } from '../actions/game';

const mapStateToProps = (state, ownProps) => ({
  value: state.game.board[ownProps.pos],
  notes: state.game.notes[ownProps.pos],
  isProblem: state.game.isProblem(ownProps.pos),
  isSolved: state.game.isSolved,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  findCandidates: () => {
    dispatch(findCandidates(ownProps.pos));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Block);
