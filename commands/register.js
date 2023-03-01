const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { messages } = require("../utilities/index")
const { specter_api } = require("../service/api/index")
const { world_short_descriptions } = require("../utilities/world_common.js")
const { getRow, getSelectRow } = require("../utilities/pagination.js")
const Player = require("../service/models/players.js")
const player_api = require("../service/api/player_api")

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
            const player = await player_api.read({DID: id})
            if (player) { 
                await interaction.reply({ content: messages.alreadyRegistered, ephemeral: true })
                return
            }
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
                const embed = new EmbedBuilder()
                    .setTitle(`🎇 Welcome to Kami Bot!`)
                    .setDescription(`Placeholder`)
                    .setFooter({ text: `You can change your name and character later in the game if you so choose.`})
                    .setTimestamp()

                new_player = new Player({
                    DID: id,
                    NAME: name,
                    SPECTER: specters[pageIndex],
                    LVL: 1,
                    XP: 0,
                    CARDS: [],
                    EQUIPPED_RANK: "",
                    GUILD: "",
                    USED_CODES : [],
                    OWNED_RANKS: [],
                    OWNED_CARDS: [],
                    QUESTS: [],
                    TOTAL_ELEMENTAL_DAMAGE: [],
                    TOTAL_SCENARIOS_COUNT: [],
                    CURRENT_WORLD: "",
                    CURRENT_ZONE: "",
                    BALANCE: {"GOLD": 20000, "DIAMONDS": 0},
                    MISCELLANEOUS: [],
                    IS_ADMIN: false,
                    TIMESTAMP: Date.now()
                })
                player_api.create(new_player)
                interaction.editReply({
                    embeds: [embed],
                    components: []
                });
                return

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