# Final Fantasy XIV Character Creation Aviability Bot
Want to make a character on a certain congested FFXIV server but don't want check 200 times a day? This tool will help you achieve that. Setup takes less than 5 mintues.

# Setup
This bot is self-hosted, so you will need to do a few things to get it running:
1. Install Node.js https://nodejs.org/en/
2. Create a discord bot account https://discordpy.readthedocs.io/en/stable/discord.html and create a new token
3. Invite the discord bot account to your server
4. Download this repository
5. Open a CMD in its base directory and write `npm install`
6. Configure the bot
7. After the dependencies and configuration are done installing write `npm start`

# Configuring the bot
In .env you can configure the following parameters:
1. `DISCORDJS_BOT_TOKEN` - paste your discord bot token here
2. `USERS_TO_NOTIFY` - paste the IDs of the users you want to notify (right click on user and then select Copy ID) and format it in the following way `USERS_TO_NOTIFY="<@USERID1> <@USERID2> etc..."`
3. `CHANNEL_ID` - The ID of the channel you want to use (right click and copy ID on the channel name)
4. `SERVER_NAME` - The server name you want to make your character on (Odin for example)
5. `POLLING_INTERVAL` - Should be left as is. This is the frequency in MS that the bot will check for character creation aviability.