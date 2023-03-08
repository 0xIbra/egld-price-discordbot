import { Client, IntentsBitField, GatewayIntentBits, SlashCommandBuilder } from 'discord.js'
import dotenv from 'dotenv'
import ElrondClient from './api'
import { Color } from './colors'

// commands
import InfoCommand from './commands/info';

dotenv.config()

let nickname = 'EGLD Price'
let lastPrice: any = null

// update price
setInterval(() => {
    ElrondClient.getCurrentPrice()
        .then(price => {
            let color = Color.GREEN
            nickname = `${price.toFixed(2)} USD`

            let guilds = client.guilds.cache.map(guild => guild.id)
            for (const key in guilds) {
                const guildId = guilds[key]
        
                client.guilds.fetch(guildId)
                    .then(guild => {
                        guild.members.me?.setNickname(nickname)
                        // guild.members.me?.roles.color?.setColor('#5AF580')
                        // guild.members.me?.roles.hoist?.setColor('#5AF580')
                        // let role = guild.members.me?.roles.botRole
                        
                        let user = client.user
                        // console.log(user)

                        let role = guild.roles.cache.find(role => role.name === "EGLD")
                        // console.log('role: ', role)

                        // role?.edit({ color: 3066993, permissions: role.permissions })
                        //     .then(updated => console.log('color updated: ', updated))
                        //     .catch(e => console.log('error: ' + e))

                    })
            }
        })

}, 5000)

// const client = new Client({
//     intents: [
//         GatewayIntentBits.Guilds,
//         GatewayIntentBits.GuildMembers,
//         GatewayIntentBits.GuildWebhooks
//     ]
// })
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
    ]
})


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'info') {
        await interaction.reply(await InfoCommand())
    }
})

const infoCommand = new SlashCommandBuilder()
    .setName('info')
    .setDescription('Returns general information on the Elrond Blockchain.');


client.on('ready', async () => {
    console.log('bot online.');

    await client.application?.commands.create(infoCommand)
})

client.login(process.env.BOT_TOKEN);
