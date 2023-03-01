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
        let query = {}
        if (!name && !code) {
            await interaction.reply({ content: "Please provide a name or code", ephemeral: true })
            return
        }
        name ? query = {NAME: name} : query = {CARD_CODE: code}
        const response = await card_api.read(query)
        let card = new card_class(response.NAME, response.CARD_CODE, response.CARD_IMAGE, response.CARD_VARIANT_NAME, response.MAIN_ELEMENT, response.CLASS, response.PRICE, response.WORLD, response.HEALTH, response.ATTACK, response.DEFENSE, response.SPEED, response.RANK, response.MORALITY, response.TIER, response.AVAILABLE, response.MOVES, response.QUEST, response.ZONES, response.WEAKNESS, response.RESISTANT, response.REPEL, response.IMMUNE, response.ABSORB)
        
        const embed = new EmbedBuilder()
            .setTitle(card.variant_name)
            .setImage(card.image)
            .setFooter({ text: `Card Code: ${card.code}`})
            .setTimestamp()

        await interaction.reply({ embeds: [embed] })
    }
}
