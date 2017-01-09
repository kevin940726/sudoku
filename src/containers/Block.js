import { connect } from 'react-redux';
import Block from '../components/Block';

const mapStateToProps = (state, ownProps) => ({
  value: state.game.board[ownProps.pos],
  notes: state.game.notes[ownProps.pos],
  isProblem: state.game.isProblem(ownProps.pos),
  isSolved: state.game.isSolved,
});

export default connect(mapStateToProps)(Block);
