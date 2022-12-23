import React from 'react';
import { useDispatch } from 'react-redux';
import { addSymbol, clearLast, clearAll, getResult, accessMemory, togglePower } from '../redux/calcSlice';

export default function BodyCalc() {
  const dispatch = useDispatch();

  return (
    <div className='calc-body'>
      <div className='calc-body-grid-top'>
        <button className='button-dark' onClick={() => dispatch(togglePower())}>OFF</button>
        <button className='button-dark' onClick={() => dispatch(accessMemory('c'))}>MRC</button>
        <button className='button-dark' onClick={() => dispatch(accessMemory('-'))}>M-</button>
        <button className='button-dark' onClick={() => dispatch(accessMemory('+'))}>M+</button>
        <button className='button-dark bigger-text-button' onClick={() => dispatch(addSymbol('÷'))}>÷</button>
         
        <button className='button-dark bigger-text-button' onClick={() => dispatch(addSymbol('%'))}>%</button>
        <button className='button-light bigger-text-button' onClick={() => dispatch(addSymbol('7'))}>7</button>
        <button className='button-light bigger-text-button' onClick={() => dispatch(addSymbol('8'))}>8</button>
        <button className='button-light bigger-text-button' onClick={() => dispatch(addSymbol('9'))}>9</button>
        <button className='button-dark bigger-text-button' onClick={() => dispatch(addSymbol('*'))}>x</button>
        
        <button className='button-dark bigger-text-button' onClick={() => dispatch(addSymbol('√'))}>√</button>
        <button className='button-light bigger-text-button' onClick={() => dispatch(addSymbol('4'))}>4</button>
        <button className='button-light bigger-text-button' onClick={() => dispatch(addSymbol('5'))}>5</button>
        <button className='button-light bigger-text-button' onClick={() => dispatch(addSymbol('6'))}>6</button>
        <button className='button-dark bigger-text-button' onClick={() => dispatch(addSymbol('-'))}>-</button>
      </div>

      <div className='calc-body-grid-bottom'>
        <button className='non-plus-button button-light' onClick={() => dispatch(clearLast())}>C</button>
        <button className='non-plus-button button-light bigger-text-button' onClick={() => dispatch(addSymbol('1'))}>1</button>
        <button className='non-plus-button button-light bigger-text-button' onClick={() => dispatch(addSymbol('2'))}>2</button>
        <button className='non-plus-button button-light bigger-text-button' onClick={() => dispatch(addSymbol('3'))}>3</button>
        <button className='plus-button button-dark bigger-text-button' onClick={() => dispatch(addSymbol('+'))}>+</button>
        <button className='non-plus-button button-light' onClick={() => dispatch(clearAll())}>AC</button>
        <button className='non-plus-button button-light bigger-text-button' onClick={() => dispatch(addSymbol('0'))}>0</button>
        <button className='non-plus-button button-light bigger-text-button' onClick={() => dispatch(addSymbol('.'))}>.</button>
        <button className='non-plus-button button-dark bigger-text-button' onClick={() => dispatch(getResult())}>=</button>
      </div>
    </div>
  );
};
