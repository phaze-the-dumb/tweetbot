const Twit = require('twit');
const discord = require('discord.js');
const talkedRecently = new Set();
const prefix = "t/"

const bot = new discord.Client();

var T = new Twit({
    consumer_key:         'YoNcloXryrwcI3WvuufTX4wUZ',
    consumer_secret:      'RD6JnxClW9C4fqGFNWzGB4ZEHDjTQsCTh78VSC9joydwSjMgDF',
    access_token:         '1178714991308021761-8Arzc2RMJojKVNT5tBTIjwNrSSqlWb',
    access_token_secret:  'hOGSl6xg4b58ut2pRX1pLAo8oDky0JPtBvq3lCqqG6Noo',
})

function tweet(txt){
    T.post('statuses/update', {status: txt}, tweeted)

    function tweeted(err, data, response) {
        if(err){
            console.log("Something went wrong!");
        }
        else{
            console.log("It worked!");
        }
    }
}

bot.on('ready', async function(){
    console.log('Online')
})

bot.on('message', async function(msg){
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
	let args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    if(command === "tweet"){
        args = args.join(' ')

        msg.channel.createInvite({ unique: true, temporary: false }).then(invite => {
            tweet(args+'\n\nThis was sent from a discord bot in discord.gg/'+invite.code+' by '+msg.author.tag+' Add the bot to your server here https://wiresdev.ga/tbot')
        });

        msg.channel.send('I tweeted '+args+'\n\nYou can view it here `https://twitter.com/Wiresboy2`\n Add the bot to your server here `https://wiresdev.ga/tbot`')
    }
})

bot.login('ODE0MDcyMDg4NTAyNDY4NjU5.YDYhtg.vUY7QvUeOa7MAApxiCQ1ce5PtJE')
