const inquirer = require('inquirer');
const generator = require('./generator.js');
const fs = require('fs');

// Required Questions, first set of questions prompt
const reqQuestions = [
    {
        type: 'input',
        name: 'username',
        message: "Enter your Github username: ",
        default: "ejhuang2015",
    },
    {
        type: 'input',
        name: 'contact',
        message: "Where can users reach you? Enter your email address: ",
        default: "ejhuang.2015@gmail.com",
    },
    {
        type: 'input',
        name: 'title',
        message: 'Enter the title of your project: ',
        default: 'My project',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Type out a short description about your project: ',
        default: "Description about my project",
    },
    {
        type: 'list',
        name: 'license',
        message: 'Which license type did you want to use?',
        choices: ['GNU', 'MIT', 'ISC', 'Apache', 'Other'],
    },

]
// Other License prompt
const otherLicense = {
    type: 'input',
    name: 'otherLicense',
    message: "Paste your license in here or leave a link: "
}

// Optional Checkbox prompt
const optionalPrompts = {
    type: "checkbox",
    name: "optional",
    message: "Choose which sections you want to include in your Read Me file.",
    choices: ["Installation", "Usage", "Test", "Contributing", "Contributors"]
}

// Optional inputs prompt
const installPrompt = {
    type: "input",
    name: "content",
    message: "Please enter your instructions for installation: ",
}
const usagePrompt = {
    type: "input",
    name: "content",
    message: "Please enter your instructions for usage: ",
}
const testPrompt = {
    type: "input",
    name: "content",
    message: "Please enter your instructions for testing: ",
}
const contributePrompt = {
    type: "input",
    name: "content",
    message: "Please enter your instructions for contributing: ",
}
const contributorsPrompt = [
    {
        type: "input",
        name: "content",
        message: "Please enter a contributor to your project: ",
    },
    {
        type: "list",
        name: "addMore",
        message: "Do you want to add another contributor?",
        choices: ["Yes", "No"],
    }
]

// Will store the username and contact information
const footerInfo = [];
// Will store the contributors information
const contributorsList = [];


// Start of program
function main() {
    console.log("Welcome to the README generator!");
    start();
}
// Ask the first set of questions
function start() {
    // Ask the user for the required information to generate the read me
    inquirer
        .prompt(reqQuestions)
        .then(reqAnswers => {
            // Check and Create the folder where files will be generated to 
            if (!fs.existsSync("./Generated-Content")) {
                fs.mkdirSync("./Generated-Content");
            }
            
            // Creates the header section and makes a new readme with the header information
            const header = generator.projectHeader(reqAnswers.title, reqAnswers.description, reqAnswers.license);
            fs.writeFile('./Generated-Content/README.md', header, (err) => err ? console.error(err) : console.log('Read me started!'));

            // Push the username and contact information to the array
            footerInfo.push(reqAnswers.username, reqAnswers.contact);

            // If user chose Other for their license, ask for a link to their license
            if (reqAnswers.license === "Other") {
                choseOtherL();
            }
            // If user chose any option for their license, copy the premade license into a new file called license.txt
            else {
                fs.copyFile(`./Licenses/${reqAnswers.license}.txt`, './Generated-Content/license.txt', (err) => err ? console.error(err) : console.log('License copied!'));
                // Move on to optional checkbox
                optionalCheck();
            }
        });
}
// Ask for the other license if chosen
function choseOtherL() {
    inquirer
        .prompt(otherLicense)
        .then(answer => {
            // Creates a new license.txt with the user's license
            fs.writeFile('./Generated-Content/license.txt', answer.otherLicense, (err) => err ? console.error(err) : console.log('New License created!'));
            optionalCheck();
        });
}
// Ask for which optional sections to add
function optionalCheck() {
    inquirer
        .prompt(optionalPrompts)
        .then(answer => {
            // Shorten variable name
            let choices = answer.optional;
            const installBool = choices.includes("Installation");
            const useBool = choices.includes("Usage");
            const testBool = choices.includes("Test")
            const contributeBool = choices.includes("Contributing");
            const contributorBool = choices.includes("Contributors");

            // Create a table of contents based on user's choices
            const tableOfContents = generator.projectTableContents(installBool, useBool, testBool, contributeBool, contributorBool);
            fs.appendFileSync('./Generated-Content/README.md', tableOfContents)

            // If installation was selected, do the installation section
            if (installBool) {
                installation(useBool,testBool,contributeBool,contributorBool);
            }
            // If the previous option(s) was not selected but this was, do the usage section
            else if (useBool) {
                usage(testBool, contributeBool, contributorBool);
            }
            // If the previous option(s) was not selected but this was, do the test section
            else if (testBool) {
                testSection(contributeBool, contributorBool);
            }
            // If the previous option(s) was not selected but this was, do the contributing section
            else if (contributeBool) {
                contributeSection(contributorBool);
            }
            // If the previous option(s) was not selected but this was, do the contributors section
            else if (contributorBool) {
                contributorSection();
            }
            // No selection was selected, end the read me with the last two sections
            else {
                endSection();
            }
        });

}

function installation(use, test, contribute, contributors) {
    inquirer
        .prompt(installPrompt)
        .then(answer => {
            fs.appendFileSync('./Generated-Content/README.md', generator.projectInstallation(answer.content));
            if (use){
                usage(test, contribute, contributors);
            }
            else if (test){
                testSection(contribute, contributors);
            }
            else if (contribute){
                contributeSection(contributors);
            }
            else if (contributors){
                contributorSection();
            }
            else {
                endSection();
            }
        });
}
function usage(test, contribute, contributors) {
    inquirer
        .prompt(usagePrompt)
        .then(answer => {
            fs.appendFileSync('./Generated-Content/README.md', generator.projectUsage(answer.content));
            if (test){
                testSection(contribute, contributors);
            }
            else if (contribute){
                contributeSection(contributors);
            }
            else if (contributors){
                contributorSection();
            }
            else {
                endSection();
            }
        });
}
function testSection(contribute, contributors) {
    inquirer
        .prompt(testPrompt)
        .then(answer => {
            fs.appendFileSync('./Generated-Content/README.md', generator.projectTest(answer.content));
            if (contribute){
                contributeSection(contributors);
            }
            else if (contributors){
                contributorSection();
            }
            else {
                endSection();
            }
        });
}
function contributeSection(contributors) {
    inquirer
        .prompt(contributePrompt)
        .then(answer => {
            fs.appendFileSync('./Generated-Content/README.md', generator.projectContributing(answer.content));
            if (contributors){
                contributorSection();
            }
            else {
                endSection();
            }
        });
}
function contributorSection() {
    inquirer
        .prompt(contributorsPrompt)
        .then(answer => {
            contributorsList.push(answer.content);
            // While user keeps wanting to add users, repeat this process
            if (answer.addMore == "Yes") {
                contributorSection();
            }
            else {
                fs.appendFileSync('./Generated-Content/README.md', generator.projectContributors(contributorsList));
                endSection();
            }
        });
}

function endSection() {
    fs.appendFileSync('./Generated-Content/README.md', generator.projectFooter(footerInfo[0], footerInfo[1]));
    console.log("Readme file is finished!");
}



// Initiate
main();