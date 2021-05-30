const chalk = require("chalk");
const figlet = require("figlet");

module.exports = () => {
  console.clear();
  console.log(
    chalk.yellowBright(figlet.textSync("CLIBOT", { horizontalLayout: "full" })),
    chalk.yellow(`
Nodejs Whatsapp and Telegram Bot CLI
github.com/jack5341
    `)
  );
};
