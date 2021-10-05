require('colors');

const options = [
    {
        value: 1,
        name: `${'1'.green}. Search place`
    },
    {
        value: 2,
        name: `${'2'.green}. History`
    },
    {
        value: 0,
        name: `${'0'.green}. Exit`
    }
];

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'Waht do you wanna do?',
        choices: options
    }
];

const pauseQuestion = [
    {
        type: 'input',
        name: 'enter',
        message: `Press ${'ENTER'.green} to continue`
    }
];

module.exports = {
    options,
    questions,
    pauseQuestion
}