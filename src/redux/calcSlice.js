import { createSlice } from '@reduxjs/toolkit';
import { calculateTerm } from './calculateTerm.js';

const initialState = {
  power: 'on',
  term: '',
  lastResult: '',
  memory: 0,
  isResult: false,
  intermediateResult: ''
};

export const calcSlice = createSlice({
  name: 'calculate',
  initialState,
  reducers: {
    addSymbol: (state, action) => {
      if(state.power == 'on') {
        if(state.isResult) {
          state.term = '';
          state.isResult = false;
        }
        state.term += action.payload;
      }
    },
    clearLast: (state) => {
      state.term = state.term.slice(0, -1);
    },
    clearAll: (state) => {
      state.term = '';
    },
    getResult: (state) => {
      if(state.power == 'on') {
        state.term = calculateTerm(state.term, state.lastResult);
        state.lastResult = state.term;
        state.isResult = true;
      }
    },
    accessMemory: (state, action) => {
      if(state.power == 'on') {
        state.term = calculateTerm(state.term, state.lastResult);
        
        switch(action.payload) {
          case '+':
            state.memory += parseFloat(state.term);
            break;
          case '-':
            state.memory -= state.term;
            break;
          case 'c':
            state.term = state.memory;
            state.memory = 0;
            break;
        }
      }
    },
    togglePower: (state) => {
      state.power = state.power == 'on' ? 'off' : 'on';
      if(state.power == 'off') {
        state.term = '';
      }
    }
  }
});

export const { addSymbol, clearLast, clearAll, getResult, accessMemory, togglePower } = calcSlice.actions;

export const selectTerm = (state) => state.calculate.term;

export const selectPower = (state) => state.calculate.power;

export default calcSlice.reducer;
