const { SlashCommandBuilder } = require("@discordjs/builders")
const { PermissionFlagsBits, ButtonBuilder, ButtonStyle, Events  } = require("discord.js")
const { EmbedBuilder, ActionRowBuilder, ComponentType } = require("discord.js")
const { messages } = require("../utilities/index")



module.exports = {
    data: new SlashCommandBuilder()
        .setName("register")
        .setDescription("Register for Kami Bot")
        .addStringOption(option => 
                option
                    .setName("name")
                    .setDescription("Name of your character")
                    .setRequired(true)
        ),
        async execute(interaction) {
            try {
                const id = interaction.user.id
                // const organization_info = await organizations_api.read({"OWNER": id})

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('yes')
                            .setLabel('Yes')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('no')
                            .setLabel('No')
                            .setStyle(ButtonStyle.Danger)
                    )


            } catch(err) {
                console.log(err)
                if(err) await interaction.reply({content: "Error! Check with support.", ephemeral: true})
                return
            }
        }
}