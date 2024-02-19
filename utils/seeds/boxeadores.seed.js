const mongoose = require('mongoose');
const Boxeadores = require('../../models/Boxeadores.js');
const fs = require('fs').promises;


const DB_URL = "mongodb+srv://root:55hJkNFETwtUGAtl@joni.auofi0k.mongodb.net/?retryWrites=true&w=majority";
// const DB_URL = "mongodb+srv://root:KEBORhhxfghZaJ4a@root.maejaze.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( async () => {
    const allBoxeadores = await Boxeadores.find();

    if( allBoxeadores.length ) {
        await Boxeadores.collection.drop();
    }
}).catch( error => {
    console.log(`Ha habido un error eliminando los datos ${error}`);
}).then( async () => {
        const filePath = './utils/seeds/db/boxeadores.json';
        const data = await fs.readFile(filePath, 'utf-8');
        const parseData = JSON.parse(data);
        const boxeadoresDocs = parseData.map((boxeadores) => {
            return new Boxeadores(boxeadores);
        });
    await Boxeadores.insertMany(boxeadoresDocs);
}).catch((error) => {
    console.log(`Ha habido un error añadiendo elementos a la base de datos ${error}`);
})
.finally(() => mongoose.disconnect());

/* const mongoose = require('mongoose');
const Boxeadores = require('../../models/Boxeadores.js');
const fs = require('fs').promises;

const DB_URL = "mongodb+srv://root:KEBORhhxfghZaJ4a@root.maejaze.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    const allBoxeadores = await Boxeadores.find();

    if (allBoxeadores.length) {
        await Boxeadores.collection.drop();
    }
}).catch(error => {
    console.log(`Ha habido un error eliminando los datos ${error}`);
}).then(async () => {
    try {
        const filePath = './utils/seeds/db/boxeadores.json';
        const data = await fs.readFile(filePath, 'utf-8');
        const parseData = JSON.parse(data);
        const boxeadoresDocs = parseData.map((boxeador) => new Boxeadores(boxeador));
        await Boxeadores.insertMany(boxeadoresDocs);
        console.log('Datos añadidos exitosamente.');
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`Error: El archivo 'boxeadores.json' no fue encontrado en la ruta especificada.`);
        } else {
            console.log(`Ha habido un error leyendo o añadiendo elementos a la base de datos: ${error}`);
        }
    }
}).finally(() => {
    mongoose.disconnect();
});
*/
