import React from 'react';
import style from './ControlBar.css';

class Time extends React.Component {
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

    return (
      <div>{'0000'.substr(0, 4 - time.toString().length) + time.toString()}</div>
    );
  }
}

const ControlBar = ({ newGame, emitter }) => (
  <div className={style.controlBar}>
    <div></div>
    <button className={style.newGameBtn} onClick={newGame}>
      <span><i className="material-icons">star</i></span>
    </button>
    <Time emitter={emitter} />
  </div>
);

export default ControlBar;
