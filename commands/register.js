const { SlashCommandBuilder } = require("@discordjs/builders")
const Pagination = require("customizable-discordjs-pagination")
const { PermissionFlagsBits, ButtonBuilder, ButtonStyle, Events } = require("discord.js")
const { EmbedBuilder, ActionRowBuilder, ComponentType } = require("discord.js")
const { messages } = require("../utilities/index")
const { specter_api } = require("../service/api/index")
const { world_descriptions } = require("../utilities/world_common.js")

const { pagination, ButtonTypes, ButtonStyles } = require('@devraelfreeze/discordjs-pagination');


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
                    { name: "Boy", value: "Boy" },
                    { name: "Girl", value: "Girl" }
                )
        )
        .addStringOption(option =>
            option
                .setName("age")
                .setDescription("Age of your character")
                .setRequired(true)
                .addChoices(
                    { name: "Kid", value: "kid" },
                    { name: "Teenager", value: "teenager" },
                    { name: "Adult", value: "adult" },
                    { name: "Elder", value: "elder" },
                    { name: "Unknown", value: "unknown" }
                )
        ),
    async execute(interaction) {
        try {
            const id = interaction.user.id
            const name = interaction.options.getString("name")
            const gender = interaction.options.getString("type")
            const age = interaction.options.getString("age")
            const specters = await specter_api.readAllByQuery({"AGE_GROUP": age, "GENDER": gender})
            const listOfEmbeds = []
            const pages = {}

            for (let specter of specters) {
                const world = specter.WORLD;
                const capitalizedWorld = world.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

                const embed = new EmbedBuilder()
                    .setTitle(`Name: ${name}`)
                    .setDescription("Choose your specter! Don't worry, you can change it later.")
                    .addFields(
                        { name: "Personality Type", value: `${specter.PERSONALITY}` },
                        { name: "Class", value: `${specter.CLASS}` },
                        { name: "Age", value: `${specter.AGE.toString()}` },
                        { name: "World", value: `${specter.WORLD}` },
                        { name: "Race", value: `${specter.RACE}` },
                        { name: "World Description", value: `${world_descriptions[capitalizedWorld]}` }
                    )
                    .setImage(specter.IMAGE)
                    .setFooter({text: `Page: ${listOfEmbeds.length + 1}/${specters.length}`})
                    .setTimestamp()
                listOfEmbeds.push(embed)
            }

            const getRow = (id) => {
                const row = new ActionRowBuilder()

                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId('prev_embed')
                        .setStyle('Primary')
                        .setEmoji('◀️')
                        .setDisabled(pages[id] === 0)
                )

                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId('user_option')
                        .setStyle('Secondary')
                        .setEmoji('✅')
                )

                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId('next_embed')
                        .setStyle('Secondary')
                        .setEmoji('▶️')
                        .setDisabled(pages[id] === listOfEmbeds.length - 1)
                )
                return row
            }

            pages[id] = pages[id] || 0
            const embed = listOfEmbeds[pages[id]]

            interaction.reply({
                ephemeral: true,
                embeds: [embed],
                components: [getRow(id)]
            })

            const collector = interaction.channel.createMessageComponentCollector({ time: 150000 })

            collector.on('collect', btnInt => {
                if (!btnInt) {
                    return
                }
                btnInt.deferUpdate()

                if (btnInt.customId !== 'prev_embed' && btnInt.customId !== 'next_embed' && btnInt.customId !== 'user_option'){
                    return
                }

                console.log(btnInt.customId)

                if (btnInt.customId === 'user_option') {
                    console.log('-------------------------------------------------')
                    const { fields } = listOfEmbeds[pages[id]].data
                    console.log(fields)
                    console.log('-------------------------------------------------')

                }
                else if (btnInt.customId === 'prev_embed' && pages[id] > 0) {
                    --pages[id]
                }
                else if (btnInt.customId === 'next_embed' && pages[id] < listOfEmbeds.length - 1) {
                    ++pages[id]
                }

                interaction.editReply({
                    embeds: [listOfEmbeds[pages[id]]],
                    components: [getRow(id)]
                })
            });

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} items`);
            });

        } catch (err) {
            console.log(err)
            if (err) await interaction.reply({ content: "Error! Check with support.", ephemeral: true })
            return
        }
    }
}