
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
        render: state => {
            if (state.length > 15) {
                view.screen.style.fontSize = '.3em';
            }
            if (state.length > 7 && state.length <= 15) {
                view.screen.style.fontSize = '.5em'
            }
            if (state.length <= 7) {
                view.screen.style.fontSize = '1em'
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
        },
        init: () => {
            view.bindEvents();
        }
    };

    view.init();
});
