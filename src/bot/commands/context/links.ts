import {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  ContextMenuCommandInteraction,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  MessageActionRowComponentBuilder,
  PermissionsBitField,
  ComponentType
} from 'discord.js';
import { links } from "@/lib/data";

const data = new ContextMenuCommandBuilder()
  .setName('Give Link')
  .setType(ApplicationCommandType.Message)
  .setDefaultMemberPermissions(PermissionsBitField.Flags.SendMessages)
  .setDMPermission(false)

const execute = async (interaction: ContextMenuCommandInteraction) => {
  const selectLinkMenu = new StringSelectMenuBuilder()
    .setCustomId('select-link-menu')
    .setPlaceholder('Select a link type...')
    .addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel('Website')
        .setDescription('The main Cosmic Universe Website.')
        .setValue('website'),
      new StringSelectMenuOptionBuilder()
        .setLabel('Gallery')
        .setDescription('The Cosmic Universe Gallery!')
        .setValue('gallery'),
      new StringSelectMenuOptionBuilder()
        .setLabel('Whitepaper')
        .setDescription('The nitty gritty.')
        .setValue('whitepaper'),
      new StringSelectMenuOptionBuilder()
        .setLabel('DEX')
        .setDescription('Trader Joe MAGIC/AVAX.')
        .setValue('dex'),
    );

  const selectLinkActionRow = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(selectLinkMenu);

  if (!interaction.isMessageContextMenuCommand()) {
    return
  }
  const targetMsg = interaction.targetMessage;
  const channel = targetMsg.channel;
  if (!channel.isTextBased()) {
    return;
  }

  const interactionResponse =   await interaction.reply({
    content:  "Select a link type to send:",
    components: [selectLinkActionRow],
    ephemeral: true
  })
  try {

    const msgComponent = await interactionResponse.awaitMessageComponent({
      componentType: ComponentType.StringSelect,
      filter: i => i.user.id === interaction.user.id,
      time: 60_000,
    })
    const type = msgComponent.values[0];
    await targetMsg.reply({
      content: `${links.find(l => l.value === type.toLowerCase()).link}`,
    })
  } catch (e) {

  }
  await interaction.deleteReply()


};

export default {data, execute}