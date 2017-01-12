import React from 'react';
import onClickOutside from 'react-onclickoutside';
import style from './NumPad.css';
import { range } from 'lodash';
import { Motion, spring } from 'react-motion';

const customSpring = (i) => (
  spring(i, { stiffness: 230, damping: 32 })
);

const NumPad = ({ handleClickOutside, handleClick }) => (
  <div className={style.container}>
    <div className={style.numPad}>
      {range(1, 10).map(num => (
        <Motion key={num} defaultStyle={{ i: 0 }} style={{ i: customSpring(100) }}>
          {({ i }) => (
            <span
              className={style.num}
              key={num}
              onClick={() => handleClick(num)}
              style={{
                transform: `translate(${((num - 1) % 3 - 1) * i}%, ${(~~((num - 1) / 3) - 1) * i}%)`,
              }}
            >
              {num}
            </span>
          )}
        </Motion>
      ))}
      <Motion
        defaultStyle={{
          i: 0,
          width: 45,
          left: -22.5,
        }}
        style={{
          i: customSpring(100),
          width: spring(45 * 3),
          left: spring(-22.5 - 45),
        }}
      >
        {({ i, width, left }) => (
          <span
            className={style.num0}
            key="0"
            onClick={() => handleClick(0)}
            style={{
              transform: `translate(0, ${2 * i}%)`,
              width: `${width}px`,
              left: `${left}px`,
            }}
          ><i className="material-icons">space_bar</i></span>
        )}
      </Motion>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="0" width="0">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
        </filter>
      </defs>
    </svg>
  </div>
);

export default onClickOutside(NumPad);
