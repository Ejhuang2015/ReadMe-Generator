const inquirer = require('inquirer');
const generator = require('./generator.js');
const fs = require('fs');

// Required Questions
    // Input for user's github username
    // Input for the user's email address or other point of contact
    // Input for the title of the project
    // Input for a description of the project
    // List for the license the user wants to use.
        // If user chooses "Other" option...
            // Input link to user's prefered license
// Checkbox the sections the user wants to include in their ReadMe
    // Add new inquirer.Separator("") that describe what each option is
    // Choices of Installation Instructions, Usage Instructions, Test Examples, Contributing Instructions, and Contributors Sections, 
// Optional questions based on user's choice
    // Input for the installation instructions for the project
    // Input for the usage instructions for the project
    // Input for links to test exmaples of your project
    // Input for instructions on how to contribute to the project
    // Input for the first contributor of your project
        // Confirm if user wants to list another person
            // Repeat step if yes otherwise continue
// Final Statements

// if (!fs.existsSync("./Generated-Content")) {
//     fs.mkdirSync("./Generated-Content");
//   }
//   fs.writeFile('./Generated-Content/README.md', freshReadMe, (err) => err ? console.error(err) : console.log('Read me created!'));
  
const reqQuestions = [
    {
        type: 'input',
        name: 'username',
        message: "Enter your Github username",
        default: "ejhuang2015",
    },
    {
        type: 'input',
        name: 'contact',
        message: "Where can users reach you? Enter your email address.",
        default: "ejhuang.2015@gmail.com",
    },
    {
        type: 'input',
        name: 'title',
        message: 'Enter the title of your project',
        default: 'My project',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Type out a short description about your project.',
        default: "Description about my project",
    },
    {
        type: 'list',
        name: 'license',
        message: 'Which license type did you want to use?',
        choices: ['GNU', 'MIT', 'ISC', 'Apache', 'Other'],
    },

]

inquirer
  .prompt(reqQuestions)
  .then(answers => {
    console.log(answers);
  });