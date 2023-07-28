// npx ts-node prune.ts

// const fs = require('fs');
import * as fs from 'fs';
// import { Ship } from '@azurapi/azurapi/build/types/ship';

// let shipJson : Ship[];
let shipJson;
ReadShipJson: // this is a jump but we're gonna use it for code organization
{
    shipJson = JSON.parse(fs.readFileSync('./bak/ships.json', "utf8"));
    console.log(shipJson.length);
};

// todo: also optimize image library file size (dl from wiki then shrink filesize)

GetEssex:
{
    const essex = shipJson.filter((s) =>
        s.names.en.toLowerCase().includes("essex")
    )[0];
    // console.log(essex)
    fs.writeFileSync('./src/data/essex.json', JSON.stringify(essex));
}

// also prune out the dupe fried de gross
// const min = result.map((ship) => {
//     return { names: { en: ship.names.en } };
// })

// WriteOutNewJson:
// fs.writeFileSync('./db/ships_min.json', JSON.stringify(min));