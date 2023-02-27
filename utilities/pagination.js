const { ActionRowBuilder, ButtonBuilder, SelectMenuBuilder } = require("discord.js")


const getRow = (pageIndex, listOfEmbeds) => {
    const row = new ActionRowBuilder()

    row.addComponents(
        new ButtonBuilder()
            .setCustomId('prev_embed')
            .setStyle('Primary')
            .setEmoji('◀️')
            .setDisabled(pageIndex === 0)
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
            .setDisabled(pageIndex === listOfEmbeds.length - 1)
    )

    row.addComponents(
        new ButtonBuilder()
            .setCustomId('quit')
            .setStyle('Danger')
            .setLabel('Quit')
    )

    return row
}

const getSelectRow = (pageIndex, listOfEmbeds) => {
    const selectRow = new ActionRowBuilder();
  
    const selectOptions = listOfEmbeds.map((embed, index) => {
      return {
        label: `Page ${index + 1}`,
        value: index.toString(),
        default: index === pageIndex
      };
    });
  
    selectRow.addComponents(
      new SelectMenuBuilder()
        .setCustomId('select_menu')
        .setPlaceholder('Select a page')
        .addOptions(selectOptions)
    );
  
    return selectRow;
};

module.exports = {
    getRow,
    getSelectRow
}