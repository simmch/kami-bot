const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { card_class } = require("../classes/card_class.js")
const { card_api } = require("../service/api/index")
const { checkRegistered } = require("../middleware/checkRegistered.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("viewcard")
        .setDescription("View a character card")
        .addStringOption(option =>
            option
                .setName("name")
                .setDescription("Name of the character")
                .setRequired(false)
        )
        .addStringOption(option =>
            option
                .setName("code")
                .setDescription("Code of the character")
                .setRequired(false)
        ),
    async execute(interaction) {
        let player = await checkRegistered(interaction);
        console.log("viewcard command executed")
        const name = interaction.options.getString("name") || null
        const code = interaction.options.getString("code") || null
        if (!name && !code) {
            await interaction.reply({ content: "Please provide a name or code", ephemeral: true })
            return
        }

        const nameRegex = new RegExp(name, 'i'); // 'i' flag makes the regex case-insensitive
        const codeRegex = new RegExp(code, 'i');
        const query = name ? { NAME: { $regex: nameRegex } } : { CARD_CODE: { $regex: codeRegex } };
        const response = await card_api.read(query)
        if(!response) { // If no card is found with the given name or code
            await interaction.reply({ content: "No card found", ephemeral: true })
            return
        }
        let card = new card_class(response.NAME, response.CARD_CODE, response.CARD_IMAGE, response.CARD_VARIANT_NAME, response.MAIN_ELEMENT, response.CLASS, response.PRICE, response.WORLD, response.HEALTH, response.ATTACK, response.DEFENSE, response.SPEED, response.RANK, response.MORALITY, response.TIER, response.AVAILABLE, response.MOVES, response.QUEST, response.ZONES, response.WEAKNESS, response.RESISTANT, response.REPEL, response.IMMUNE, response.ABSORB)
        if(!card) {
            await interaction.reply({ content: "No card found", ephemeral: true })
            return
        }
        const embed = await card.getCardEmbed()

        await interaction.reply({ embeds: [embed] })
    }
}
