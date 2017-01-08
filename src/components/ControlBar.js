import React from 'react';
import style from './ControlBar.css';
import { padStart } from 'lodash';

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
    return (
      <div>{padStart(this.state.time, 4, '0')}</div>
    );
  }
}

const ControlBar = ({ newGame, emitter }) => (
  <div className={style.controlBar}>
    <div></div>
    <button className={style.newGameBtn} onClick={newGame}>
      <span style={{ marginLeft: '-3px' }}>⭐</span>
    </button>
    <Time emitter={emitter} />
  </div>
);

export default ControlBar;
