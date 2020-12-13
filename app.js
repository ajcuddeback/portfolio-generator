const inquirer = require('inquirer');
const { writeFile, copyFile } = require('./utils/generate-site.js');
const generatePage = require('./src/page-template');

// declaring the prompt user method
const promptUser = () => {
    //returns the inquirer prompt
    return inquirer.prompt([
        // Array of objects for each question
        {
            // Objects that are required for inquirer
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            // validation function
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub username? (Required)',
            // validation function
            validate: gitNameInput => {
                if (gitNameInput) {
                    return true;
                } else {
                    console.log('Please enter your github username!');
                    return false;
                }
            }
        },
        {
            // This will confirm if the user would like to add stuff to about me section or not. if returns false, then the user will not be asked
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information abour yourself for an "About me" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some info about yourself:',
            // the 'when' property will take all of the data that the user has answered so far, then you can specify which object you want. and if it is true. then it will run. if false it will not.
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};

// Prompt method with argument of portfolioData to store the data of the entire portfolio
const promptProject = portfolioData => {
    // Will show the user this is a new project they are adding
    console.log(`
    ==================
    Add a New Project
    ==================
    `);
    // If nothing is currently stored in the portfolioData.projects array - then create and empty array
    if (!portfolioData.projects) {
        portfolioData.projects = []; // <<<<< Ask tutor! why do I have to have the .projects at end of the array.. lesson said becuase the array will delete previous data. But that doesnt make sense
    }
    // return the project prompts
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            // validation function
            validate: projectNameInput => {
                if (projectNameInput) {
                    return true;
                } else {
                    console.log('Please enter your project name!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build your project with? (Check all the apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the Github link to your project. (Required)',
            // validation function
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('Please enter your project link!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
        // then take the projects data (^^^ everything above)...
        .then(projectData => {
            // and push the projectData into the portfolioData.projects array
            portfolioData.projects.push(projectData);
            // if the user confirmed they want to add another project...
            if (projectData.confirmAddProject) {
                // run the prompt project function again with the portfolio data
                return promptProject(portfolioData);
                // else...
            } else {
                // return the portfolioData (The array)
                return portfolioData;
            }
        })
}

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        return generatePage(portfolioData);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    });