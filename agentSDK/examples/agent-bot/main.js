'use strict';

/*
 * This demo extends MyCoolAgent with the specific reply logic: 
 * 
 * 1) Echo any new message from the consumer
 * 2) Close the conversation if the consumer message starts with '#close' 
 * 
 */
require('dotenv').config();
const MyCoolAgent = require('./MyCoolAgent');

const echoAgent = new MyCoolAgent({

    accountId: process.env.LP_ACCOUNT,
    username: process.env.LP_USER,
    password: process.env.LP_PASS

    // For internal lp only use 
    //  export LP_CSDS=hc1n.dev.lprnd.net

    // csdsDomain: process.env.LP_CSDS
});

function message(inputIncludes, reply, contentEvent) {
    if(contentEvent.message.includes(inputIncludes)){
        
        echoAgent.publishEvent(
        {
            dialogId: contentEvent.dialogId,
            event: {
                type: 'ContentEvent',
                contentType: 'text/plain',
                message: reply
            }
        })
        
    }
}

echoAgent.on('MyCoolAgent.ContentEvnet',(contentEvent)=>{
    if (contentEvent.message.startsWith('#close')) {
        echoAgent.updateConversationField({
            conversationId: contentEvent.dialogId,
            conversationField: [{
                    field: "ConversationStateField",
                    conversationState: "CLOSE"
                }]
        });

    } 

    else if (contentEvent.message.includes("crash")){
        
    }

    else {
        message("echo",'echo:' + contentEvent.message, contentEvent);
        message("weather", "I could be further programmed to give you weather information?", contentEvent);
        message("hi", "hey to you too", contentEvent);
        message("your name", "I am just a bot, nobody named me yet :(", contentEvent);
        message("hey", "hello", contentEvent);
        message("bla", "bla bla bla", contentEvent);

        if(contentEvent.message.includes("route") || contentEvent.message.includes("transfer")){

            echoAgent.publishEvent({
              dialogId: contentEvent.dialogId,
              event: {
                type: 'ContentEvent',
                contentType: 'text/plain',
                message: "Transferring to sales..."
            }
             });

            console.log("Transferring begins");

            echoAgent.updateConversationField({
                conversationId: contentEvent.dialogId,
                conversationField: [
                {
                    field: "Skill",
                    type: "UPDATE",
                    skill: "1157620932"
                },

                {
                    field: "ParticipantsChange",
                    type: "REMOVE",
                    role: "ASSIGNED_AGENT"
                }

                ]
            });
        }
    }


    // if (contentEvent.message.includes('echo')) {

    //     echoAgent.publishEvent(
    //     {
    //         dialogId: contentEvent.dialogId,
    //         event: {
    //             type: 'ContentEvent', 
    //             contentType: 'text/plain', 
    //             message: `echo : ${contentEvent.message}`
    //         }


    //     });
    // }


});