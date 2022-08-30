import { Client, GatewayIntentBits, PermissionsBitField } from 'discord.js'
import dotenv from 'dotenv'
import ElrondClient from './api'
import { Color } from './colors'

dotenv.config()

let nickname = 'EGLD Price'
let lastPrice: any = null

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
                        console.log(`price updated: ${nickname}`)
                        guild.members.me?.setNickname(nickname)
                        // guild.members.me?.roles.color?.setColor('#5AF580')
                        // guild.members.me?.roles.hoist?.setColor('#5AF580')
                        let role = guild.members.me?.roles.botRole
                        console.log('role: ', role)

                        role?.setColor(Color.GREEN)
                            .then(updated => console.log('updated: ', updated))

                    })
            }
        })

}, 5000)

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
})


client.on('ready', async () => {
    console.log('bot online.')

    // let guilds = client.guilds.cache.map(guild => guild.id)
    // for (const key in guilds) {
    //     const guildId = guilds[key]
    //     let guild = await client.guilds.fetch(guildId)
    //     guild.members.me?.setNickname(nickname)
    // }
})



client.login(process.env.BOT_TOKEN)