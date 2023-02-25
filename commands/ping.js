const { SlashCommandBuilder } = require("@discordjs/builders")
const { PermissionFlagsBits, ButtonBuilder, ButtonStyle, Events  } = require("discord.js")
const { EmbedBuilder, ActionRowBuilder, ComponentType } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(interaction) {
        try {
            await interaction.reply({content: "Pong!"})
        } catch(err) {
            console.log(err)
            if(err) await interaction.reply({content: "Error! Check with support.", ephemeral: true})
            return
        }
    }
}