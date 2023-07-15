// const fs = require('fs');
import * as fs from 'fs';
const result = JSON.parse(fs.readFileSync('./db/ships.json'));
console.log(result.length);

// todo: also optimize image library file size (dl from wiki then shrink filesize)

// also prune out the dupe fried de gross
const min = result.map((ship) => {
    return { names: { en: ship.names.en } };
})

fs.writeFileSync('./db/ships_min.json', JSON.stringify(min));