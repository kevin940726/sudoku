import React from 'react';
import style from './ControlBar.css';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 0,
    };
  }

  componentDidMount() {
    this.props.emitter.on('timeOnUpdate', time => {
      this.setState({ time });
    });
  }

  render() {
    const { time } = this.state;
    const { toggleTimer } = this.props;

    return (
      <div className={style.timer}>
        <i className="material-icons" onClick={toggleTimer}>timer</i>
        {'0000'.substr(0, 4 - time.toString().length) + time.toString()}
      </div>
    );
  }
}

const ControlBar = ({ newGame, emitter }) => (
  <div className={style.controlBar}>
    <div></div>
    <button className={style.newGameBtn} onClick={newGame}>
      <span><i className="material-icons">fiber_new</i></span>
    </button>
    <Timer emitter={emitter} />
  </div>
);

export default ControlBar;
