import { connect } from 'react-redux';
import ControlBar from '../components/ControlBar';
import { newGame } from '../actions/game';

const mapStateToProps = (state) => ({
  emitter: state.game._emitter,
});

const mapDispatchToProps = (dispatch) => ({
  newGame: () => {
    dispatch(newGame());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);
