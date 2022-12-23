export const calculateTerm = (term, lastResult) => {
  // parsing the string term into an array
  // with entries representing numbers and operators
  const termArr = parseIntoArr(term, lastResult);
  let result = solveAddSub(solveMultDiv(solvePercentage(solveSqrt(termArr))));
  let rounded = Math.round(result * 100) / 100;

  return rounded;
}

function parseIntoArr(term, lastResult) {
  let preTermArr = [...term.toString()];
  let result = [];
  
  if((/[+\-\*\÷\%]/).test(preTermArr[0])) {
    preTermArr.unshift(lastResult);
  }

  let isNumber = preTermArr[0] == '√' ? false : true;
  let numStr = '';

  preTermArr.forEach((symbol, index, array) => {
    if(index < (array.length - 1)) {
      if(isNumber) {
        numStr += symbol;
        if(!(/[0123456789.]/).test(array[index + 1])) {
          result.push(numStr);
          numStr = '';
          isNumber = false;
        }
      } else {
        result.push(symbol);
        isNumber = (/[0-9]/).test(array[index + 1]) || (/-/).test(array[index + 1]);
      }
    } else {
      numStr += symbol;
      result.push(numStr);
    }
  });
  return result;
}

function solveSqrt(term) {
  let termArr = term;

  if(termArr.includes('√')) {
    let firstIndex = termArr.indexOf('√');
    let secondIndex = termArr.indexOf('√', firstIndex + 1);

    let termInsideSqrt = secondIndex == -1 ?
      termArr.slice(firstIndex + 1) :
      termArr.slice(firstIndex + 1, secondIndex);
    let termLength = termInsideSqrt.length;

    let solvedInsideSqrt = Math.sqrt(solveAddSub(solveMultDiv(termInsideSqrt)));

    termArr.splice(firstIndex, termLength + 2);
    termArr.splice(firstIndex, 0, solvedInsideSqrt);

    return solveSqrt(termArr);
  } else {
    return termArr;
  }
}

function solvePercentage(term) {
  let termArr = term;

  if(termArr.includes('%')) {
    let percIndex = termArr.indexOf('%');
    let firstNum = parseFloat(termArr[percIndex - 1]);
    let secondNum = parseFloat(termArr[percIndex + 1]);
    let solvedPerc = (firstNum * secondNum)/100;

    termArr.splice(percIndex - 1, 3);
    termArr.splice(percIndex - 1, 0, solvedPerc);

    return solvePercentage(termArr);
  } else {
    return termArr;
  }
}

function solveMultDiv(term) {
  let termArr = term;

  if(termArr.includes('*') || termArr.includes('÷')) {
    let firstMult = termArr.indexOf('*') == -1 ?
      termArr.length : termArr.indexOf('*');
    let firstDiv = termArr.indexOf('÷') == -1 ?
      termArr.length : termArr.indexOf('÷');
    
    if(firstMult < firstDiv) {
      //multiply
      let firstNum = parseFloat(termArr[firstMult - 1]);
      let secondNum = parseFloat(termArr[firstMult + 1]);
      let solvedMult = firstNum * secondNum;
      termArr.splice(firstMult - 1, 3);
      termArr.splice(firstMult - 1, 0, solvedMult);
    } else {
      //divide
      let firstNum = parseFloat(termArr[firstDiv - 1]);
      let secondNum = parseFloat(termArr[firstDiv + 1]);
      let solvedDiv = firstNum / secondNum;
      termArr.splice(firstDiv - 1, 3);
      termArr.splice(firstDiv - 1, 0, solvedDiv);
    }
    return solveMultDiv(termArr);
  } else {
    return termArr;
  }
}

function solveAddSub(term) {
  let termArr = term;

  if(termArr.length == 1) {
    return termArr;
  }

  if(termArr.includes('+') || termArr.includes('-')) {
    let firstAdd = termArr.indexOf('+') == -1 ?
      termArr.length : termArr.indexOf('+');
    let firstSub = termArr.indexOf('-') == -1 ?
      termArr.length : termArr.indexOf('-');
    
    if(firstAdd < firstSub) {
      //add
      let firstNum = parseFloat(termArr[firstAdd - 1]);
      let secondNum = parseFloat(termArr[firstAdd + 1]);
      let solvedAdd = firstNum + secondNum;
      termArr.splice(firstAdd - 1, 3);
      if(termArr.length < 1) {
        termArr.push(solvedAdd);
      } else {
        termArr.splice(firstAdd - 1, 0, solvedAdd);
      }
    } else {
      //subtract
      let firstNum = parseFloat(termArr[firstSub - 1]);
      let secondNum = parseFloat(termArr[firstSub + 1]);
      let solvedSub = firstNum - secondNum;
      termArr.splice(firstSub - 1, 3);
      if(termArr.length < 1) {
        termArr.push(solvedSub);
      } else {
        termArr.splice(firstSub - 1, 0, solvedSub);
      }
    }
    return solveAddSub(termArr);
  } else {
    return termArr;
  }
}
