# SlackBot

Wafa'sBot is a chat bot built on the Hubot framework for Slack, responses for:
1. Answers the user if there is a JavaScript class today.
`have class`
2. Sends user a random quote.
`quote`
3. Sends user a beautiful destination with its picture in the country.
`beautiful destination in <country name>`
4. Sends the user the current weather of the city.
`weather in <city name>`

## Running Wafa'sBot Locally
- Install generator-hubot
`npm install -g coffeescript yo generator-hubot@next`

- Create a workspace in Slack, install Hubot in the workspace, and find your HUBOT_SLACK_TOKEN

- To start your hubot
`HUBOT_SLACK_TOKEN= <Your Token Hear> bin/hubot --adapter slack`


## Test Wafa'sBot

`have class`

![image](https://imgur.com/CekiEOU.png)

`quote`

![image](https://imgur.com/Qv1pOnZ.png)

`beautiful destination in Japan`

![image](https://imgur.com/EgJKvsm.png)

`weather in Riyadh`

![image](https://imgur.com/gGsMLD3.png)
