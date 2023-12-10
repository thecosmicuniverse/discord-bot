import {
  BaseInteraction,
  ChatInputCommandInteraction,
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
} from "discord.js";
import { contextCommands, slashCommands  } from "./commands";
const commands = [...contextCommands, ...slashCommands];
const deployCommands = async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    const data = await global.rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
      { body: commands.map(c => c.data.toJSON()) },
    ) as any[];
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
}

export const initializeBot = () => {
  if (global.client) {
    return;
  }
  global.client = new Client({ intents: [ GatewayIntentBits.Guilds ] });
  global.rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN);
  global.client.commands = new Collection();
  commands.map(c => global.client.commands.set(c.data.name, c));

  global.client.once(Events.ClientReady, async (c: Client) => {
    await deployCommands();
    console.log(`Ready! Logged in as ${c.user.tag}`);
  });

  global.client.on(Events.InteractionCreate, async (interaction: BaseInteraction) => {
    if (interaction.isChatInputCommand() || interaction.isMessageContextMenuCommand()) {
      const command = global.client.commands.get(interaction.commandName);
      if (!command) {
        return console.error(`No command matching ${interaction.commandName} was found.`);
      }
      try {
        await command.execute(interaction as ChatInputCommandInteraction);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
          await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
      }
    } else if (interaction.isAutocomplete()) {
      const command = global.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }

      try {
        await command.autocomplete(interaction);
      } catch (error) {
        console.error(error);
      }
    }

  });

  global.client.login(process.env.DISCORD_BOT_TOKEN);
}
