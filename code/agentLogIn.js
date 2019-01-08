const Agent = require('node-agent-sdk').Agent;
require('dotenv').config()

const agent = new Agent({
    accountId: process.env.LP_ACCOUNT,
    username: process.env.LP_USER,
    password: process.env.LP_PASS
});

agent.on('connected', () => {
    console.log(`connected...`);

    // subscribe to all conversations in the account
    agent.subscribeExConversations({
        'convState': ['OPEN']
    }, (err, resp) => {
        console.log('subscribed successfully', err, resp);
    });
});

// log all conversation updates
agent.on('cqm.ExConversationChangeNotification', notificationBody => {
    console.log(JSON.stringify(notificationBody));
})