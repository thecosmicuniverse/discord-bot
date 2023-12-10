import {
  ChatInputCommandInteraction,
  SlashCommandBuilder
} from "discord.js";
import { links } from "@/lib/data";

const data = new SlashCommandBuilder()
  .setName("link")
  .setDescription("Get a Cosmic Universe Official Link")
  .addStringOption(option =>
    option.setName("type")
      .setDescription("Link type")
      .setRequired(true)
      .addChoices(...links.map(l => ({ name: l.name, value: l.value }))),
  )

const execute = async (interaction: ChatInputCommandInteraction) => {

  const type = interaction.options.getString("type")
  await interaction.reply({
    content: `${links.find(l => l.value === type.toLowerCase()).link}`,
    embeds: [],
    ephemeral: false
  });

};

export default { data, execute };