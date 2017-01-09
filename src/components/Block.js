import React from 'react';
import style from './Block.css';
import NumPad from '../containers/NumPad';

const Notes = ({ notes }) => (
  <div className={style.notes}>
    {Object.keys(notes)
      .filter(note => notes[note])
      .map(note => (
        <span className={style.note} key={note}>
          {note}
        </span>
      )
    )}
  </div>
);

class Block extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isNumPadShow: false,
      isNote: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClick() {
    if (!this.props.isProblem && !this.props.isSolved) {
      this.setState({
        isNumPadShow: !this.state.isNumPadShow,
        isNote: false,
      });
    }
  }
  handleRightClick(e) {
    e.preventDefault();

    if (!this.props.isProblem && !this.props.isSolved) {
      this.setState({
        isNumPadShow: !this.state.isNumPadShow,
        isNote: true,
      });
    }
  }

  handleClickOutside() {
    this.setState({
      isNumPadShow: false,
    });
  }

  render() {
    const { pos, value, notes, isProblem } = this.props;
    const { isNumPadShow, isNote } = this.state;

    return (
      <div className={isProblem ? style.blockProblem : style.block} onClick={this.handleClick} onContextMenu={this.handleRightClick}>
        {value !== 0 && value !== '0' ?
          value :
          Object.keys(notes).length !== 0 && (
            <Notes notes={notes} />
          )
        }
        {isNumPadShow && (
          <NumPad
            handleClickOutside={this.handleClickOutside}
            pos={pos}
            isNote={isNote}
          />
        )}
      </div>
    );
  }
}

export default Block;
