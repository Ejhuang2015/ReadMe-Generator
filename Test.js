function tableContents (install, usage, test, contributing, contributors){
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
${addInstall}${addUsage}${addTest}${addContributing}${addContributors}
* [Questions](#questions)
* [License](#license)
`
}

console.log(tableContents(true,false,false,true,true));