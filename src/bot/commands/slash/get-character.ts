import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  Embed,
  EmbedBuilder,
  SlashCommandBuilder
} from "discord.js";
import { links } from "@/lib/data";
import openSeaSDK from "@/lib/opensea";
import { Chain } from "opensea-js";

const races = [
  {name: "Wizard", value: "wizard", address: "0xBF20c23D25Fca8Aa4e7946496250D67872691Af2"},
  {name: "Elf", value: "elf", address: "0x9a337A6F883De95f49e05CD7D801d475a40a9C70"}
]
const data = new SlashCommandBuilder()
  .setName("get-character")
  .setDescription("Get details on a Cosmic Universe Character")
  .addStringOption(option =>
    option.setName("race")
      .setDescription("Character Race")
      .setRequired(true)
      .addChoices(...races.map(l => ({name: l.name, value: l.value}))),
  )
  .addIntegerOption(option =>
    option.setName("token-id")
      .setDescription("The On-Chain Token ID")
      .setRequired(true)
      .setAutocomplete(true)
  )

const autocomplete = async (interaction: AutocompleteInteraction) => {
  const race = interaction.options.getString("race");
  const focusedValue = interaction.options.getFocused();
  const choices = Array.from(Array(10_000)).map((_, i) => i + 1);
  const filtered = choices.filter(choice => race === "elves" ? choice <= 617 : choice < 9_999);
  await interaction.respond(
    filtered.map(choice => ({name: choice.toString(), value: choice})),
  );
}
const execute = async (interaction: ChatInputCommandInteraction) => {

  const race = interaction.options.getString("race");
  const tokenId = interaction.options.getInteger("token-id");
  const address = races.find(r => r.value === race).address;
  const { nft } = await openSeaSDK.api.getNFT(address, tokenId.toString(), Chain.Avalanche);
  console.log(nft);
  const baseEmbed = new EmbedBuilder()
    .setTitle(nft.name)
    .setThumbnail(`https://opensea.io/collections/${nft.collection}/${nft.identifier}`)
    .setURL(nft.image_url)
    .setColor(race === "wizard" ? "#580147" : "#0d2b4c")
    .setTimestamp(new Date())
    .setFooter({
      text: `Called by ${interaction.user.displayName}`,
      iconURL: interaction.user.displayAvatarURL()
    });

  let embed: EmbedBuilder;
  switch (race) {
    case "wizard":
      embed = baseEmbed
      break;
    case "elf":
      embed = baseEmbed
      break;
    default:
      return
  }

  await interaction.reply({
    content: "",
    embeds: [embed],
    ephemeral: false
  });

};

export default {data, autocomplete, execute};