import React from 'react';
import { useSelector } from 'react-redux';
import { selectTerm, selectPower } from '../redux/calcSlice';

export default function HeadCalc() {
  const term = useSelector(selectTerm);
  const power = useSelector(selectPower);
  const displayClass = power == 'on' ?
    'calc-head-display-inner display-on' :
    'calc-head-display-inner display-off';
  
  return (
    <div className="calc-head">
      <p className="calc-head-brand">PASIO</p>
      <p className="calc-head-device">ELECTRONIC CALCULATOR</p>
      <p className="calc-head-model">HL-815L</p>
      <div className="calc-head-display-outter">
        <div className={displayClass}>
          {term}
        </div>
      </div>
    </div>
  );
};
