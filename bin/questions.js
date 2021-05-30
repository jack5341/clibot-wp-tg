const inquirer = require("inquirer");
const ora = require("ora");
const chalk = require("chalk");
const fs = require("fs-extra");
const getBanner = require("./banner");

const friend = require("./friendlist.json")

module.exports.getApp = async () => {
  const questions = {
    name: "type",
    message: "Which app bro ?",
    type: "list",
    choices: [
      { name: "Whatsapp", value: 1 },
      { name: "Telegram", value: 2 },
      { name: "I just want to fuck off", value: 99 },
    ],
  };

  const values = await inquirer.prompt(questions);
  switch (values.type) {
    case 1:
      console.log(
        chalk.bgYellow.black(`
oh fuck! i forgot 
🚧 Whatsapp still under construction   `)
      );
      return this.getApp();
    case 2:
      return this.getOrder();
    case 99:
      console.log(
        chalk.bgYellowBright.black(" If you need, you know just type clibot to terminal 😎")
      )
      return null;
    default:
      break;
  }
  if (values.type === 1) {
  }

  console.clear();
  getBanner();
  this.getOrder(values.type);
};

module.exports.getCredentials = async () => {
  const questions = [
    {
      name: "wp_key",
      type: "input",
      message: "API Key for Whatsapp: (Please fill correctly)",
    },
    {
      name: "tg_key",
      type: "input",
      message: "API Key for Telegram: (Please fill correctly)"
    }
  ]

  const values = await inquirer.prompt(questions);
  fs.writeJSON("./bin/config.json", { user: values });
  console.clear();
  getBanner();
  this.getOrder();
};

module.exports.getOrder = async () => {
  const questions = {
    name: "order",
    message: `What can i do for ya?`,
    type: "list",
    choices: [
      { name: "Send a message to someone", value: 1 },
      { name: "Send a message to everyone", value: 2 },
      { name: "Want to change app", value: 98 },
      { name: "Delete my configs", value: 99 },
    ],
  };
  const values = await inquirer.prompt(questions);

  console.clear();
  getBanner();

  switch (values.order) {
    case 1:
      return this.getMessage();

    case 98: 
      return this.getApp()
    case 99:
      fs.writeJSON("./bin/config.json", {});
      console.log(chalk.bgYellow.black(" Configs cleaned succesfully "));
      return this.getCredentials();

    default:
      break;
  }
};

module.exports.getMessage = async() => {
  const friendlist = [{name: "<-- Go back", value: 99}]
  friend.list.map((e,key) => {
    friendlist.push({name: e, value: key})
  })

  const questions = [
    {
      name: "to",
      message: "To who?",
      type: "list",
      choices: friendlist,
    },
    {
      name: "msg",
      type: "input",
      message: "Enter your message:",
    },
  ];
  
  const spinner = await ora("Getting friend list...").start();
  
  spinner.stop()
  let message = await inquirer.prompt(questions);
  if(message.to === 99) return this.getOrder()
  console.log(
    chalk.bgGreen.black(`Message sent succesfully to ${friendlist[message.to].name}
Your message was ${message.msg}`)
  )
  return this.getOrder()
}
