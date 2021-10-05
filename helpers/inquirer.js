const inquirer = require('inquirer');
require('colors');
const {
    questions,
    pauseQuestion
} = require('../constants/menu');

const inquirerMenu = async() => {
    console.clear();
    console.log('======================'.green);
    console.log('   Select an option   '.white);
    console.log('======================\n'.green);

    const {option} = await inquirer.prompt(questions);

    return option;
}

const pause = async() => {
    console.log('\n');
    await inquirer.prompt(pauseQuestion);
    return;
}

const readInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if(value.length === 0){
                    return 'Please input a value'
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;

}

const deleteTaskQuestions = async(tasks = []) => {
    const choices = tasks.map((task, index) => {
        const idx = `${index+1}`.green;
        return {
            value: task.id,
            name: `${idx} ${task.description}`
        }
    });

    choices.unshift({
        value: '0',
        name: `0.`.green + ' Cancel'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices
        }
    ];

    const {id} = await inquirer.prompt(questions);

    return id;
}

const showListChecklist = async(tasks = []) => {
    const choices = tasks.map((task, index) => {
        const idx = `${index+1}`.green;
        return {
            value: task.id,
            name: `${idx} ${task.description}`,
            checked: task.completedIn ? true : false
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices
        }
    ];

    const {ids} = await inquirer.prompt(question);
    return ids;
}

const confirm = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const {ok} = await inquirer.prompt(question);

    return ok;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    deleteTaskQuestions,
    confirm,
    showListChecklist
}