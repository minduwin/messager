const { Client } = require('pg');
require('dotenv').config();

const data_url = process.env.DATA_URL;

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR ( 255 ) NOT NULL,
    text VARCHAR ( 255 ) NOT NULL,
    added DATE DEFAULT CURRENT_DATE
);

INSERT INTO messages (username, text)
VALUES
    ('Jibinho', 'Tô com uma fome, moreno...'),
    ('d. Maxima', 'Não é mesmo, Jaqueline.'),
    ('Ralf Moreno', 'Sua energúmena!!');   
`;

async function main() {
    console.log('seeding...');
    const client = new Client({
        connectionString: data_url
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('Done...');
}

main();