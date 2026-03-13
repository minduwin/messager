const messages = [
    {
        user: 'Jibinho',
        text: 'To com uma fome, moreno...',
        added: new Date()
    },
    {
        user: 'Charlinho',
        text: 'Gosto mais de batata e de estudar.',
        added: new Date()
    },
    {
        user: 'Prof. Gilmar',
        text: 'Tuuudo por causa da... Vadiagem!!',
        added: new Date()
    },
];

const db = require('../db/queries');

async function showMessage(req, res) {
    const messages = await db.getAllMessages();
    res.render('index', {
        title: 'Messages',
        messages: messages,
    });
};

async function newMessage(req, res) {
    res.render('form', { 
        title: 'Form Message'
    });
};

async function postMessage(req, res) {
    const { user, text } = req.body;

    if (!user || !text) {
        return res.status(400).send('Please fill all fields...')
    }

    await db.insertMessage({ user: userName, text: userMessage });
    res.redirect('/');
};

const openMessage = (req, res) => {
    const messageId = parseInt(req.params.id);
    if (messageId >= 0 && messageId < messages.length) {
        const message = messages[messageId];
        res.render('message', { title: `Message from ${message.user}`, message });
    } else {
        res.status(404).send('Message not found');
    }
};

module.exports = { showMessage, newMessage, postMessage, openMessage };