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
    const { alias, info } = req.body;

    if (!alias || !info ) {
        return res.status(400).send('Please fill all the fields...');
    }

    try {
        await db.insertMessage(alias, info);
        res.redirect('/');
    } catch (error) {
        console.error('Database error: ', error);
        res.status(500).send('Something went wrong...');
    }
};

async function openMessage(req, res) {
    // const messageId = parseInt(req.params.id);
    // if (messageId >= 0 && messageId < messages.length) {
    //     const message = messages[messageId];
    //     res.render('message', { title: `Message from ${message.username}`, message });
    // } else {
    //     res.status(404).send('Message not found');
    // }

    const messageId = req.params.id;

    try {
        const message = await db.getMessage(messageId);
        if (message) {
            res.render('message', {
                title: `Message from ${message.username}`,
                message: message
            });
        } else {
            res.status(500).send('Message not found');
        }
    } catch (error) {
        console.error('Message error: ', error);
        res.status(400).send('Server error');
    }
};

module.exports = { showMessage, newMessage, postMessage, openMessage };