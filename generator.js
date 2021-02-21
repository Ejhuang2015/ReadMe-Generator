module.exports = {
    // Create the header (Title and description)
    projectHeader: (title, description, license) => `# ${title}
![${license} License](https://img.shields.io/badge/License-${license}-blue)

${description}
`,

    // Create the table of contents
    projectTableContents: function (install, usage, test, contributing, contributors) {
        const addInstall = install ? `* [Installation](#installation)
` : "";
        const addUsage = usage ? `* [Usage](#usage)
` : "";
        const addTest = test ? `* [Test Examples](#test-examples)
` : "";
        const addContributing = contributing ? `* [Contributing](#how-to-contribute)
` : "";
        const addContributors = contributors ? `* [Contributors](#contributors)
` : "";
        return `## Table of Contents
${addInstall}${addUsage}${addTest}${addContributing}${addContributors}* [Questions](#questions)
* [License](#license)
`
    },

    // Create the installation section
    projectInstallation: (install) => `# Installation
${install}
`,

    // Create the usage section
    projectUsage: (usage) => `# Usage
${usage}
`,

    // Create the test section
    projectTest: (test) => `# Test Examples
${test}
`,

    // Create the contributing section
    projectContributing: (contribute) => `# How to Contribute
${contribute}
`,

    // Create the contributors section
    projectContributors: function (contributors) {
        // Parse the array into a string which we can then split by commas and join everything with a new line.
        const contributorsPrefix = contributors.map(addListPrefix);
        const contributorsList = contributorsPrefix.toString().split(",").join("\n");
        return `# Contributors
Thanks to the following people who have contributed to this project:

${contributorsList}
`
    },

    // Create the footer (Questions and license)
    projectFooter: (user, contact) => `# Questions
You can find me at my [github page here](https://github.com/${user}).
Any comments, questions, or concerns? Email me  at ${contact}.

# License
### Copyright (c) [2021] [${user}]
View the license in [license.txt](./license.txt)`,
};

function addListPrefix(item) {
    return `* ${item}
`
}