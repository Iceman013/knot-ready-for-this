var Discord = require('discord.io');
var logger = require('winston');
var fs = require('fs');
var colorDot = ['online', 'idle', 'dnd'];
var caseMess = '';

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: process.env.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
	
	caseMess = message
	message = message.toUpperCase();
	
	if (message.substring(0, 2) == 'YO') {
	message = message.substring(2).trim()
        var args = message.split(' ');
        var cmd = args[0];
			
        args = args.splice(1);
        switch(cmd) {
            // !ping
		case 'ING':
			if ((message.charCodeAt(4) > 47 && message.charCodeAt(4) < 52) && (userID == '393586279964475393' || userID == '486985623161274378')){
				bot.setPresence({
				    game: {
					    type: parseInt(message.substring(4, 5)),
					    name: caseMess.substring(9)
				    }
				});
			}
			break;
		case 'STATUS':
			if ((message.charCodeAt(7) > 48 && message.charCodeAt(7) < 52) && (userID == '393586279964475393' || userID == '486985623161274378')){
				bot.setPresence({
				    status: colorDot[parseInt((message.substring(7, 8)) - 1)]
				});
			}
		break;
            case 'PING':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
         }
     }
});
