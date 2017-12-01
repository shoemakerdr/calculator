
document.addEventListener('DOMContentLoaded', () => {
    const model = {
        state: '0',
        prev: '',
        operator: '',
        hasEvaluated: false,
        readyForSecondInput: false,
    };

    const calc = {
        // contains operations for calculator
        add: (a,b) => {
            let answer = (100 * a) + (100 * b);
            return answer / 100;
        },
        subtract: (a,b) => {
            let answer = (100 * a) - (100 * b);
            return answer / 100;
        },
        multiply: (a,b) => {
            let answer = (100 * a) * (100 * b);
            return answer / 10000
        },
        divide: (a,b) => (100 * a) / (100 * b),
    };

    const controller = {
        posneg: () => {
            controller.setState(String(Number(model.state) * -1));
        },
        percent: () => {
            controller.setState(String(Number(model.state) / 100));
        },
        decimal: () => {
            if (model.readyForSecondInput || model.hasEvaluated) {
                controller.setState('0.');
            }
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
            if (model.readyForSecondInput) {
                controller.setState('0');
            }
            if (model.state !== '0') {
                controller.setState(`${model.state}0`);
            }
        },
        number: num => {
            if (model.hasEvaluated || model.state === '0' || model.readyForSecondInput) {
                controller.setState(num);
            }
            else controller.setState(`${model.state}${num}`);
        },
        backspace: () => {
            const { state } = model
            if (state.length === 1)
                return controller.setState('0');
            controller.setState(state.slice(0, state.length - 1))
        },
        setState: state => {
            model.state = state;
            view.render(model.state);
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
            controller.setState('0');
            model.prev = '';
            model.operator = '';
            model.hasEvaluated = false;
            model.readyForSecondInput = false;
        },
        evaluate: () => {
            if (model.operator) {
                const prevNum = Number(model.prev), stateNum = Number(model.state);
                const newState = String(calc[model.operator](prevNum, stateNum));
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

    const view = {
        buttons: document.getElementById('buttons'),
        screen: document.getElementById('screen'),
        isOperatorKey: (isShifted, key) => {
            const keys = isShifted ? [56, 187] : [106, 107, 109, 111, 189, 191];
            return keys.indexOf(key) > -1;
        },
        keys: {
            8: 'backspace',
            13: 'evaluate',
            46: 'clear',
            48: 'zero',
            49: 'one',
            50: 'two',
            51: 'three',
            52: 'four',
            53: 'five',
            54: 'six',
            55: 'seven',
            56: 'eight',
            57: 'nine',
            96: 'zero',
            97: 'one',
            98: 'two',
            99: 'three',
            100: 'four',
            101: 'five',
            102: 'six',
            103: 'seven',
            104: 'eight',
            105: 'nine',
            106: 'multiply',
            107: 'add',
            109: 'subtract',
            110: 'decimal',
            111: 'divide',
            187: 'evaluate',
            189: 'subtract',
            190: 'decimal',
            191: 'divide',
        },
        shiftedKeys: {
            53: 'percent',
            56: 'multiply',
            187: 'add',
        },
        render: state => {
            if (state.length > 15) {
                view.screen.style.fontSize = '.3em';
            }
            if (state.length > 7 && state.length <= 15) {
                view.screen.style.fontSize = '.4em';
            }
            if (state.length <= 7) {
                view.screen.style.fontSize = '.8em';
            }
            view.screen.innerHTML = state;
        },
        bindEvents: () => {
            view.buttons.addEventListener('click', (event) => {
                if (event.target.className === 'operators' && event.target.id !== 'evaluate') {
                    controller.setOperator(event.target.id);
                }
                else controller[event.target.id]();
            });
            document.addEventListener('keyup', (event) => {
                event.preventDefault();
                let keyCommand = event.shiftKey ? view.shiftedKeys[event.which] : view.keys[event.which];
                if (keyCommand) {
                    if (view.isOperatorKey(event.shiftKey, event.which))
                        controller.setOperator(keyCommand);
                    else
                        controller[keyCommand]();
                }
            });
        },
        init: () => {
            view.bindEvents();
        }
    };

    view.init();
});
