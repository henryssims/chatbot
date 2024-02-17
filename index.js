import openai from './config/open_ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
    // const chatCompletion = await openai.chat.completions.create({
    //     model: 'gpt-3.5-turbo',
    //     messages: [
    //         { role: 'user', content: 'What is the capital of Pennsylvania?'}
    //     ]
    // });

    // console.log(chatCompletion.choices[0].message.content);

    console.log(colors.bold.green('Welcome to the Chatbot Program'));
    console.log(colors.bold.green('You can start chatting with the bot'));

    const chatLog = [];

    while (true) {
        const userInput = readlineSync.question(colors.yellow('You: '))

        try {
            const messages = chatLog.map(([role, content]) => ({ role, content }));

            messages.push({ role: 'user', content: userInput });

            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: messages
            });

            const completionText = completion.choices[0].message.content;

            if (userInput.toLowerCase() === 'exit') {
                console.log(colors.green('Bot: ') + completionText);
                return;
            }

            console.log(colors.green('Bot: ') + completionText);

            chatLog.push(['user', userInput]);
            chatLog.push(['assistant', completionText]);
        } catch (error) {
            console.error(colors.red(error));
        }
    }
}

main();