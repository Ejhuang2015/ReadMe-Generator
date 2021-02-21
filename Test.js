/**
 * Checkbox list examples
 */

'use strict';
var inquirer = require('inquirer');

inquirer
  .prompt({
      type: "checkbox",
      name: "optional",
      message: "Choose which sections you want to include in your Read Me file.",
      choices: ["Installation", "Usage", "Test", "Contributing", "Contributors"]
  })
  .then((answers) => {
    console.log(JSON.stringify(answers, null, '  '));
  });