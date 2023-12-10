import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder
} from "discord.js";
import openSeaSDK from "@/lib/opensea";
import { Chain, NFT } from "opensea-js";

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
  const tokenId = interaction.options.getInteger("token-id");
  const choices = Array.from(Array(10_000)).map((_, i) => i + 1);
  const raceFilter = choices.filter(choice => race === "elves" ? choice <= 617 : choice < 9_999);
  const filtered = raceFilter.filter(choice => choice.toString().includes(tokenId.toString() || ""))
  await interaction.respond(
    filtered.map(choice => ({name: choice.toString(), value: choice})).slice(0, 10),
  );
}

const spacer = (name: string = '\u200B') => ({ name, value: '\u200B' });
const execute = async (interaction: ChatInputCommandInteraction) => {

  const race = interaction.options.getString("race");
  const tokenId = interaction.options.getInteger("token-id");
  const address = races.find(r => r.value === race).address;
  const resp = await openSeaSDK.api.getNFT(address, tokenId.toString(), Chain.Avalanche);
  const nft = resp.nft as NFT & { traits: { trait_type: string , display_type: string, value: string | number }[]};
  const visual = nft.traits.filter(t => t.trait_type !== "property" && typeof t.value === "string");
  const profession = nft.traits.filter(t => typeof t.value === "number" && t.value > 0);
  const staking = nft.traits.filter(t => t.trait_type === "property");

  const embed = new EmbedBuilder()
    .setTitle(nft.name)
    .setThumbnail(`https://opensea.io/collections/${nft.collection}/${nft.identifier}`)
    .setURL(nft.image_url)
    .setColor(race === "wizard" ? "#580147" : "#0d2b4c")
    .setTimestamp(new Date())
    .setFooter({
      text: `Called by ${interaction.user.displayName}`,
      iconURL: interaction.user.displayAvatarURL()
    })
    .addFields(spacer("Visual"))
    .addFields(...visual.map(t => ({ name: t.trait_type, value: t.value as string, inline: true})).sort((a, b) => a.name.localeCompare(b.name)))
    .addFields(spacer("Active Professions"))
    .addFields( ...profession.map(t => ({ name: t.trait_type, value: t.value as string, inline: true})).sort((a, b) => a.name.localeCompare(b.name)))
    .addFields(spacer("Activities"))
    .addFields(...staking.map(t => ({ name: "\u200B", value: t.value as string, inline: true })))
  await interaction.reply({
    content: "",
    embeds: [embed],
    ephemeral: false
  });

};

export default {data, autocomplete, execute};