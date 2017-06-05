const state = {
    value: '0',
    prev: '',
    operator: ''
};

const calc = {
    add: (a,b) => a + b,
    subtract: (a,b) => a - b,
    multiply: (a,b) => a * b,
    divide: (a,b) => a / b
};

const controller = {
    posneg: state => String(Number(state) * -1),
    percent: state => String(Number(state) / 100),
    setState: state => {
        state.value = String(state);
    },
    setPrev: () => {
        state.prev = state.value;
    },
    setOperator: op => {
        state.operator = op;
    },
    clear: () => {
        state.value = '0';
        state.prev = '';
        state.operator = '';
    },
    evaluate: (prev, state, operator) => {
        const prevNum = Number(prev), stateNum = Number(state);
        const newState = calc[operator](prevNum, stateNum);
        controller.setState(newState);
    }
};
