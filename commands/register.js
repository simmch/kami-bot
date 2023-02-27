const { SlashCommandBuilder } = require("@discordjs/builders")
const Pagination = require("customizable-discordjs-pagination")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, SelectMenuBuilder } = require("discord.js")
const { messages } = require("../utilities/index")
const { specter_api } = require("../service/api/index")
const { world_short_descriptions } = require("../utilities/world_common.js")
const { getRow, getSelectRow } = require("../utilities/pagination.js")

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
                        { name: "Home World Description", value: `${world_short_descriptions[capitalizedWorld]}` }
                    )
                    .setImage(specter.IMAGE)
                    .setFooter({text: `Page: ${listOfEmbeds.length + 1}/${specters.length}`})
                    .setTimestamp()
                listOfEmbeds.push(embed)
            }

            let pageIndex = 0;

            interaction.reply({
              ephemeral: true,
              embeds: [listOfEmbeds[pageIndex]],
              components: [getSelectRow(pageIndex, listOfEmbeds), getRow(pageIndex, listOfEmbeds)]
            });
            
            const collector = interaction.channel.createMessageComponentCollector({ time: 150000 });
            
            collector.on('collect', btnInt => {
              if (!btnInt) {
                return;
              }
              btnInt.deferUpdate();
            
              if (btnInt.customId !== 'prev_embed' && btnInt.customId !== 'next_embed' && btnInt.customId !== 'user_option' && btnInt.customId !== 'quit' && btnInt.customId !== 'select_menu') {
                return;
              }
            
              if (btnInt.customId === 'user_option') {
                console.log('-------------------------------------------------');
                const { fields } = listOfEmbeds[pageIndex].data;
                console.log(fields);
                console.log('-------------------------------------------------');
              } else if (btnInt.customId === 'prev_embed' && pageIndex > 0) {
                pageIndex--;
              } else if (btnInt.customId === 'next_embed' && pageIndex < listOfEmbeds.length - 1) {
                pageIndex++;
              } else if (btnInt.customId === 'quit') {
                interaction.editReply({
                  embeds: [listOfEmbeds[pageIndex]],
                  components: []
                });
                collector.stop();
                return;
              } else if (btnInt.customId === 'select_menu') {
                const { values } = btnInt;
                pageIndex = parseInt(values[0]);
                }


            
              interaction.editReply({
                embeds: [listOfEmbeds[pageIndex]],
                components: [getSelectRow(pageIndex, listOfEmbeds), getRow(pageIndex, listOfEmbeds)]
              });
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