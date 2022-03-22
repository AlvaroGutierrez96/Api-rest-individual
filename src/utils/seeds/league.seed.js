const mongoose = require('mongoose');
const League = require('../../api/leagues/league.model');

require('dotenv').config();

const URIDB = process.env.MONGO_DB;

const leagues = //datos


mongoose.connect(URIDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
    const allPlayers = await Player.find();
    if (allPlayers.length) {
        await Player.collection.drop();
        console.log('TODO BORRADO')
    }
}).catch((err) => console.error('HAY UN ERROR EN EL BORRADO')).then(async () => {
    await Singer.insertMany(singers);
    console.info('Creado')
}).catch((err) => console.error('HAY UN ERROR EN EL CREADO')).finally(() => mongoose.disconnect());

