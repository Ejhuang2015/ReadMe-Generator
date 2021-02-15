module.exports = {
    projectTitle: createTitle(title),
    projectDescription: createDescription(description, license),
    projectTableContents: createTOC(install, usage, test, contributing, contributors),
    projectInstallation: createInstallation(install),
    projectUsage: createUsage(),
    projectTest: createTest(),
    projectContributing: createContributing(),
    projectContributors: createContributors(),
    projectContact: createContact(),
    projectLicense: createLicense(),
  };

// Generate the Title section
function createTitle (title) {
    const titleSection = `# ${title}`;
    return titleSection;
}

// Generate the Description section
function createDescription (description, license) {
    const descriptionSection = `![${license} License](https://img.shields.io/badge/License-${license}-blue)
    
    ${description}`;
    return descriptionSection;
}

// Generate the Table of Contents
function createTOC (install, usage, test, contributing, contributors) {
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
    const tableContentsSection = `## Table of Contents
    ${addInstall}${addUsage}${addTest}${addContributing}${addContributors}
    * [Contact](#contact)
    * [License](#license)`; 
    return tableContentsSection;
}

// Generate the Installation section
function createInstallation(install) {
    const installationSection = `# Installation
    ${install}`;
    return installationSection;
}

// Generate the Usage section
function createUsage() {
    const usageSection = `# Usage`;
    return usageSection;
}

// Generate the Test section
function createTest() {
    const testSection = `# Test Examples
    `;
    return testSection;
}

// Generate the Contributing section
function createContributing() {
    const contributingSection = `# How to Contribute
    `;
    return contributingSection;
}

// Generate the Contributors section
function createContributors() {
    const contributorsSection = `# Contributors
    `;
    return contributorsSection;
}

// Generate the Contact section
function createContact() {
    const contactSection = `# Contact
    `;
    return contactSection;
}

// Generate the License section
function createLicense(license) {
    const licenseSection = `# License
    `;
    return licenseSection;
}