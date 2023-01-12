const fs = require('fs');
const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');


const team = [];


const addManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the manager?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the manager?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of the manager?',
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is the office number of the manager?',
        },
    ])

        .then((managerInput) => {
            let { name, id, email, officeNumber } = managerInput;
            let manager = new Manager(name, id, email, officeNumber);
            team.push(manager);

        })
};
const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'What is the role of the employee?',
            choices: ['Engineer', 'Intern'],
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the employee?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the employee?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of the employee?',
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is the github of the employee?',
            when: (input) => input.role === 'Engineer',
        },
        {
            type: 'input',
            name: 'school',
            message: 'What is the school of the employee?',
            when: (input) => input.role === 'Intern',
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Would you like to add another employee?',
            default: false,
            
        },
    ]).then((employeeData) => {
            let { name, id, email, role, github, school, confirmAddEmployee } = employeeData;
            let employee;
            if (role === 'Engineer') {
                employee = new Engineer(name, id, email, github);
                
            } else if (role === 'Intern') {
                employee = new Intern(name, id, email, school);
                
            }
            team.push(employee);
            
            if (confirmAddEmployee) {
                return addEmployee(team);
            } else {
                console.log(team);
                return team;
            }
        })
};


    

  
addManager()
    .then(addEmployee)
   
 