// This is the MessageTags plugin for Bunny

module.exports = {
    name: "MessageTags", // Name of the plugin

    // Command handler for Bunny plugin
    commands: {
        '/create tag': async (msg, args) => {
            // Ask the user for the tag name
            let name = await getUserInput(msg, 'Enter a tag name:');
            if (!name) return msg.reply('Tag name is required!');
            
            // Ask the user for the message associated with the tag
            let message = await getUserInput(msg, 'Enter the message for the tag:');
            if (!message) return msg.reply('Message is required!');
            
            // Save the tag
            saveTag(name, message);
            msg.reply(`Tag "${name}" created successfully!`);
        },

        '/': async (msg, args) => {
            let tagName = args[0]; // The tag name the user enters

            // Check if the tag exists
            if (tags[tagName]) {
                // If the tag exists, send the saved message
                msg.reply(tags[tagName]);
            } else {
                msg.reply('Tag not found!');
            }
        }
    }
};

// In-memory storage for tags (can be replaced with file-based storage if needed)
let tags = {};

// Function to simulate getting user input
async function getUserInput(msg, prompt) {
    await msg.reply(prompt);

    // Wait for the user’s response (you might want to replace this with a more event-driven approach)
    const filter = (response) => response.author.id === msg.author.id;
    const collected = await msg.channel.awaitMessages({ filter, max: 1, time: 30000 });

    if (collected.size > 0) {
        return collected.first().content;
    }
    return null; // Return null if there’s no input in time
}

// Save the tag (This can be adapted for persistent storage)
function saveTag(name, message) {
    tags[name] = message;
}
