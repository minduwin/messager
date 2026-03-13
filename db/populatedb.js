const { Client } = require('pg');
require('dotenv').config();

const data_host = process.env.DATA_HOST;
const data_user = process.env.DATA_USER;
const data_database = process.env.DATA_DATABASE;
const data_pwd = process.env.DATA_PWD;

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user VARCHAR ( 255 ),
    text VARCHAR ( 255 ),
    added DATE DEFAULT CURRENT_DATE,
);

INSERT INTO messages (user, text)
VALUES
    ('Jibinho', 'Tô com uma fome, moreno...'),
    ('d. Maxima', 'Não é mesmo, Jaqueline.'),
    ('Ralf Moreno', 'Sua energúmena!!');   
`;

async function main() {
    console.log('seeding...');
    const client = new Client({
        connectionString: `postgresql://${data_user}:${data_pwd}@${data_host}/${data_database}`,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('Done...');
}

main();