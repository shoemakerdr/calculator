const model = {
    state: '0',
    prev: '',
    operator: '',
    hasEvaluated: false
};

const calc = {
    // contains operations for calculator
    add: (a,b) => a + b,
    subtract: (a,b) => a - b,
    multiply: (a,b) => a * b,
    divide: (a,b) => a / b
};

const controller = {
    posneg: state => String(Number(state) * -1),
    percent: state => String(Number(state) / 100),
    decimal: () => {},
    one: () => {},
    two: () => {},
    three: () => {},
    four: () => {},
    five: () => {},
    six: () => {},
    seven: () => {},
    eight: () => {},
    nine: () => {},
    zero: () => {},
    setState: state => {
        model.state = state;
    },
    setPrev: () => {
        model.prev = model.state;
    },
    setOperator: op => {
        model.operator = op;
        controller.setPrev();
    },
    clear: () => {
        model.state = '0';
        model.prev = '';
        model.operator = '';
        model.hasEvaluated = false;
    },
    evaluate: () => {
        const prevNum = Number(model.prev), stateNum = Number(model.state);
        const newState = calc[model.operator](prevNum, stateNum);
        controller.setState(newState);
        model.prev = '';
        model.operator = '';
        model.hasEvaluated = true;
    }
};
