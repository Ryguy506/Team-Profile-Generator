const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
//  array to store team members
const team = [];

//  function to add manager
const addManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the manager?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter the name of the manager!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the manager?',
            validate: idInput => {
                if (isNaN(idInput) || idInput === '') {
                    console.info(' Please enter a number!');
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of the manager?',
            validate: emailInput => {
                if (emailInput.includes('@') && emailInput.includes('.')) {
                    return true;
                } else {
                    console.log('Please enter a valid email for manger!');
                    return false;
                }
            }


        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is the office number of the manager?',
            validate: officeNumberInput => {
                if (isNaN(officeNumberInput) || officeNumberInput === '') {
                    console.info(' Please enter a number!');
                    return false;
                } else {
                    return true;
                }
            }
        },
    ])
        // then function to create manager object and push to team array
        .then((managerInput) => {
            let { name, id, email, officeNumber } = managerInput;
            let manager = new Manager(name, id, email, officeNumber);
            team.push(manager);

        })
};



// function to add employees
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
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter the name of the employee!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the employee?',
            validate: idInput => {
                if (isNaN(idInput) || idInput === '') {
                    console.info(' Please enter a number!');
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of the employee?',
            validate: emailInput => {
                if (emailInput.includes('@') && emailInput.includes('.')) {
                    return true;
                } else {
                    console.log('Please enter a valid email for employee!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is the github of the employee?',
            when: (input) => input.role === 'Engineer',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter the github of the employee!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: 'What is the school of the employee?',
            when: (input) => input.role === 'Intern',
            validate: schoolInput => {
                if (schoolInput) {
                    return true;
                } else {
                    console.log('Please enter the school of the employee!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Would you like to add another employee?',
            default: false,

        },
        //  then function to create object for employee and push to team array
    ]).then((employeeData) => {
        let { name, id, email, role, github, school, confirmAddEmployee } = employeeData;
        let employee;
        // if role is engineer, create engineer object
        if (role === 'Engineer') {
            employee = new Engineer(name, id, email, github);
            //  if role is intern, create intern object
        } else if (role === 'Intern') {
            employee = new Intern(name, id, email, school);

        }
        team.push(employee);
        //  if the confirm is true, call addEmployee function again
        if (confirmAddEmployee) {
            return addEmployee();
        } else {
            console.log(team);
            return team;
        }

    })
};


//  function for html template
const createDocument = () => {
    return `<!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Team</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"> 
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="style.css">
    </head>

    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 jumbotron mb-3 team-heading">
                    <h1 class="text-center">My Team</h1>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 d-flex flex-wrap justify-content-center">
   ${generateContent()}
    </div>
    </div>
    </div>
    </body>
    </html>
    `
}

// fuction to generate html content
const generateContent = () => {
    // function to generate manager card
    const generateManager = (manager) => {
        return `
        <div class="card mr-2 mb-2 col-2 employee-card">
        <div class="card-header bg-warning">
            <h2 class="card-title">${manager.getName()}</h2>
            <h3 class="card-title"><span class="fas fa-mug-hot mr-2"></span>${manager.getRole()}</h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">ID: ${manager.getId()}</li>
                <li class="list-group-item">Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
                <li class="list-group-item">Office number: ${manager.getOfficeNumber()}</li>
            </ul>
        </div>
    </div>
        `
    };
    // function to generate engineer card
    const generateEngineer = (engineer) => {
        return `
        <div class="card mr-2 mb-2 col-2 employee-card">
        <div class="card-header bg-info">
            <h2 class="card-title">${engineer.getName()}</h2>
            <h3 class="card-title"><span class="fas fa-glasses mr-2"></span>${engineer.getRole()}</h3>
        </div>  
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">ID: ${engineer.getId()}</li>
                <li class="list-group-item">Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
                <li class="list-group-item">GitHub: <a href="https://github.com/${engineer.getGithub()}">${engineer.getGithub()}</a></li>         

                </ul>
            </div>
        </div>
        `
    };
    // function to generate intern card
    const generateIntern = (intern) => {
        return `
        <div class="card mr-2 mb-2 col-2 employee-card">
        <div class="card-header bg-success">
            <h2 class="card-title">${intern.getName()}</h2>
            <h3 class="card-title"><span class="fas fa-user-graduate mr-2"></span>${intern.getRole()}</h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">ID: ${intern.getId()}</li>
                <li class="list-group-item">Email: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></li>
                <li class="list-group-item">School: ${intern.getSchool()}</li>
            </ul>
        </div>
    </div>
        `

    };
    //   empty string to store html
    let teamHTML = '';
    //  object to store functions for each role 
    const roleFunctions = { Manager: generateManager, Engineer: generateEngineer, Intern: generateIntern };
    // loops through team array and calls generateHTML function for each team member if the role matches
    team.forEach(teamMember => {
        const role = teamMember.getRole();
        const generateHTML = roleFunctions[role];
        //  if the role doesn't match it will skip over it
        if (generateHTML) {
            // if the role matches it will call the generateHTML function and pass in the team member
            // adds the returned html to the teamHTML string
            teamHTML += generateHTML(teamMember);
        }
    });
    //  returns the teamHTML string to be used in the createDocument function
    return teamHTML;
};

//  function to write file 
const makeFile = () => {
    fs.writeFile('./dist/index.html', createDocument(), (err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('Your team has been created! Please check out the index.html file in the dist folder to see it!');
        }
    })
};


//  function call to start program
addManager()
    .then(addEmployee)
    .then(makeFile)

