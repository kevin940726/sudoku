import { connect } from 'react-redux';
import ControlBar from '../components/ControlBar';
import { newGame } from '../actions/game';

const mapDispatchToProps = (dispatch) => ({
  newGame: () => {
    dispatch(newGame());
  },
});

export default connect(null, mapDispatchToProps)(ControlBar);
