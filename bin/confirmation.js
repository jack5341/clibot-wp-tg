const config = require("./config.json")
const chalk = require("chalk")

module.exports.isUserConfig = () => {
    if (!config.user) {
        console.log(
            chalk.bgRed.black(" You have to fill this inputs ! ")
        )
        return false
    } else {
        console.log(
            chalk.bgGreen.black(" Oh, I found all requirements ")
        )
        return true
    }
}