import { connect } from 'react-redux';
import NumPad from '../components/NumPad';
import { insert, insertNote, clearNotes } from '../actions/game';

const mapStateToProps = (state) => ({
  candidates: state.candidates,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleClick: (num) => {
    if (ownProps.isNote) {
      if (num === 0) {
        dispatch(clearNotes(ownProps.pos));
      } else {
        dispatch(insertNote(ownProps.pos, num));
      }
    } else {
      dispatch(insert(ownProps.pos, num));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NumPad);
