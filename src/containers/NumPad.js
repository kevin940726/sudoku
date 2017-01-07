import { connect } from 'react-redux';
import NumPad from '../components/NumPad';
import { insert, insertNote } from '../actions/game';

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleClick: (num) => {
    if (ownProps.isNote) {
      dispatch(insertNote(ownProps.pos, num));
    } else {
      dispatch(insert(ownProps.pos, num));
    }
  },
});

export default connect(null, mapDispatchToProps)(NumPad);
