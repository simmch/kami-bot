require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { execute } = require("./ready");


module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
    
        if (!command) return;
    
        try {
            await command.execute(interaction);
        } catch(err) {
            if (err) console.error(err)
    
            await interaction.reply({
                content: "An error occurred while executing that command.",
                ephemeral: true
            })
        }
    
    }
}