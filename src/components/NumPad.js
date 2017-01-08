import React from 'react';
import onClickOutside from 'react-onclickoutside';
import style from './NumPad.css';
import { range } from 'lodash';
import { Motion, spring } from 'react-motion';

const angleToCoor = (num, r) => ([
  `${Math.cos(Math.PI * 2 / 9 * (num - 1) - Math.PI / 2) * r}px`,
  `${Math.sin(Math.PI * 2 / 9 * (num - 1) - Math.PI / 2) * r}px`,
].join(','));

const NumPad = ({ handleClickOutside, handleClick }) => (
  <div className={style.container}>
    <div className={style.numPad}>
      <span
        className={style.num}
        key="0"
        onClick={() => handleClick(0)}
      >X</span>
      {range(1, 10).map(num => (
        <Motion key={num} defaultStyle={{ r: 0 }} style={{ r: spring(55, {stiffness: 200, damping: 15}) }}>
          {interpolatingStyle => (
            <span
              className={style.num}
              key={num}
              onClick={() => handleClick(num)}
              style={{ transform: `translate(${angleToCoor(num, interpolatingStyle.r)})` }}
            >
              {num}
            </span>
          )}
        </Motion>
      ))}
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
