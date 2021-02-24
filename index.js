const Twit = require('twit');
const fs = require('fs');
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
	
    if(command === "stop"){
    	if(msg.author.id === "595628769138442250"){
	    process.exit(0);
	}
    }
    
    if(command === "tweet"){
        if (talkedRecently.has(msg.author.id)) {
            msg.channel.send("Wait 1 minute before getting typing this again. - " + msg.author);
    	} else {
	    fs.readFile('./words.json', (err, words) => {
                if(err) return console.error(err);
                words = JSON.parse(words);
                let content = msg.content.split(' ');
                content.forEach(c => {
                    if(words.some(w => w == c)){
                        msg.channel.send('This tweet was not sent as it may be inappropriate')
	                return;
                    }
                });
            });

	    args = args.join(' ')

	    msg.channel.createInvite({ unique: true, temporary: false }).then(invite => {
	        tweet(args+'\n\nThis was sent from a discord bot in discord.gg/'+invite.code+' by '+msg.author.tag+' Add the bot to your server here https://wiresdev.ga/tbot')
	    });

	    msg.channel.send('I tweeted '+args+'\n\nYou can view it here `https://twitter.com/Wiresboy2`\n Add the bot to your server here `https://wiresdev.ga/tbot`')

	    talkedRecently.add(msg.author.id);
	    setTimeout(() => {
		talkedRecently.delete(msg.author.id);
	    }, 60000);
        }
    }
})

bot.login('ODE0MDcyMDg4NTAyNDY4NjU5.YDYhtg.vUY7QvUeOa7MAApxiCQ1ce5PtJE')
