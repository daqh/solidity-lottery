const Lottery = artifacts.require("Lottery");
const Ticket = artifacts.require("Ticket");

module.exports = function (deployer) {
    deployer.deploy(Lottery);
}
