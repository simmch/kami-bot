const { SlashCommandBuilder } = require("@discordjs/builders")
const Pagination = require("customizable-discordjs-pagination")
const { PermissionFlagsBits, ButtonBuilder, ButtonStyle, Events  } = require("discord.js")
const { EmbedBuilder, ActionRowBuilder, ComponentType } = require("discord.js")
const { messages } = require("../utilities/index")
const { specter_api } = require("../service/api/index")
const { world_descriptions } = require("../utilities/world_common.js")



module.exports = {
    data: new SlashCommandBuilder()
        .setName("register")
        .setDescription("Register for Kami Bot")
        .addStringOption(option => 
                option
                    .setName("name")
                    .setDescription("Name of your character")
                    .setRequired(true)
        )
        .addStringOption(option =>
                option
                    .setName("type")
                    .setDescription("Type of character")
                    .setRequired(true)
                    .addChoices(
                        {name: "Boy", value: "Boy"},
                        {name: "Girl", value: "Girl"}
                    )
        )
        .addStringOption(option =>
                option
                    .setName("age")
                    .setDescription("Age of your character")
                    .setRequired(true)
                    .addChoices(
                        {name: "Kid", value: "kid"},
                        {name: "Teenager", value: "teenager"},
                        {name: "Adult", value: "adult"},
                        {name: "Elder", value: "elder"},
                        {name: "Unknown", value: "unknown"}
                    )
        ),
        async execute(interaction) {
            try {
                const id = interaction.user.id
                const name = interaction.options.getString("name")
                const gender = interaction.options.getString("type")
                const age = interaction.options.getString("age")
                const specters = await specter_api.readAllByQuery({AGE_GROUP: age, GENDER: gender})

                listOfEmbeds = []
                
                for(specter of specters){
                    const world = specter.WORLD;
                    const capitalizedWorld = world.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
                                        
                    const embed = new EmbedBuilder()
                        .setTitle(`Name: ${name}`)
                        .setDescription("Choose your specter! Don't worry, you can change it later.")
                        .addFields(
                            {name: "Personality Type", value: `${specter.PERSONALITY}`},
                            {name: "Class", value: `${specter.CLASS}`},
                            {name: "Age", value: `${specter.AGE.toString()}`},
                            {name: "World", value: `${specter.WORLD}`},
                            {name: "Race", value: `${specter.RACE}`},
                            {name: "World Description", value: `${world_descriptions[capitalizedWorld]}`}
                            )
                        .setImage(specter.IMAGE)
                        .setTimestamp()
                    listOfEmbeds.push(embed)
                }
                
               
                // const buttons = [
                //     { label: 'Previous', style: 'Danger' },
                //     { label: 'Next', style: 'Success' },
                //  ];
                 
                //  new Pagination()
                //     .setCommand(interaction)
                //     .setPages(listOfEmbeds)
                //     .setButtons(buttons)
                //     .setPaginationCollector({ timeout: 120000 })
                //     .setSelectMenu({ enable: true })
                //     .setFooter({ enable: true })
                //     .send();

            } catch(err) {
                console.log(err)
                if(err) await interaction.reply({content: "Error! Check with support.", ephemeral: true})
                return
            }
        }
}