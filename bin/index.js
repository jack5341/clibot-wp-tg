const { getCredentials, getApp } = require("./questions");
const { isUserConfig } = require("./confirmation");
const getBanner = require("./banner")

getBanner();

(function () {
  require('dns').resolve('www.google.com', function(err) {
    if (!err) {
       console.log("!! No internet connection !!");
    } else {
      isUserConfig() ? getApp() : getCredentials();
    }
  });  
})();
