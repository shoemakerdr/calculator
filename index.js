const model = {
    state: '0',
    prev: '',
    operator: '',
    hasEvaluated: false,
    readyForSecondInput: false,
};

const calc = {
    // contains operations for calculator
    add: (a,b) => a + b,
    subtract: (a,b) => a - b,
    multiply: (a,b) => a * b,
    divide: (a,b) => a / b
};

const controller = {
    posneg: () => {
        controller.setState(String(Number(model.state) * -1));
    },
    percent: () => {
        controller.setState(String(Number(model.state) / 100));
    },
    decimal: () => {
        const regex = /\./g;
        if (!regex.test(model.state)) {
            controller.setState(`${model.state}.`);
        }
    },
    one: () => {
        controller.number('1');
    },
    two: () => {
        controller.number('2');
    },
    three: () => {
        controller.number('3');
    },
    four: () => {
        controller.number('4');
    },
    five: () => {
        controller.number('5');
    },
    six: () => {
        controller.number('6');
    },
    seven: () => {
        controller.number('7');
    },
    eight: () => {
        controller.number('8');
    },
    nine: () => {
        controller.number('9');
    },
    zero: () => {
        if (model.state !== '0' || model.operator) {
            controller.setState(`${model.state}0`);
        }
        if (model.readyForSecondInput) {
            controller.setState('0');
        }
    },
    number: num => {
        if (model.hasEvaluated || model.state === '0' || model.readyForSecondInput) {
            controller.setState(num);
        }
        else controller.setState(`${model.state}${num}`);
    },
    setState: state => {
        model.state = state;
        if (model.hasEvaluated) 
                model.hasEvaluated = false;
        if (model.readyForSecondInput) 
                model.readyForSecondInput = false;
    },
    setPrev: () => {
        model.prev = model.state;
    },
    setOperator: op => {
        if (model.operator) {
            controller.evaluate();
        }
        model.operator = op;
        controller.setPrev();
        model.readyForSecondInput = true;
    },
    clear: () => {
        model.state = '0';
        model.prev = '';
        model.operator = '';
        model.hasEvaluated = false;
        model.readyForSecondInput = false;
    },
    evaluate: () => {
        if (model.operator) {
            const prevNum = Number(model.prev), stateNum = Number(model.state);
            const newState = calc[model.operator](prevNum, stateNum);
            controller.setState(newState);
            model.prev = '';
            model.operator = '';
            model.hasEvaluated = true;
        }
        else {
            model.hasEvaluated = true;
        }
    }
};
