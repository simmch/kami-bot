const Player = require('../service/models/players.js');

async function checkRegistered(interaction){
    // Check if user is registered
    const userID = interaction.user.id;
    const player = await Player.findOne({DID: userID});
    if (!player) {
        await interaction.reply("You need to register before using this command. Use the /register command to register.");
        return false;
    }
    return true;
}

module.exports = {
    checkRegistered
}