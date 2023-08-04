import * as fs from 'fs';

let shipJson;
ReadShipJson: // this is a jump but we're gonna use it for code organization
{
    shipJson = JSON.parse(fs.readFileSync('./bak/ships.json', "utf8"));
    // console.log(shipJson.length);
};

let debugMap = {
    debug: {
        nation: {},
        rarity: {}
    },
    ui: {
        nation: {
            options: []
        },
        rarity: {
            options: []
        }
    },
    fn: {
        nation: {
            options: {},
            moreInfo: {}
        },
        rarity: {
            options: {},
            moreInfo: {}
        }
    }
};

DoStuff:
{
    // nationality , hullType , skins , retrofit , obtainedFrom.obtainedFrom
    shipJson.forEach((s) => {
        debugMap.debug.nation[s.nationality] = s.names.en
        debugMap.debug.rarity[s.rarity] = s.names.en
    })
    Object.keys(debugMap.debug.nation).forEach((k) => {
        let dashed = k.replaceAll(" ", "-").toLowerCase()
        debugMap["ui"]["nation"]["options"].push(
            {
                "value": dashed,
                "type": "check",
                "label": k
            })
        debugMap["fn"]["nation"]["options"][k.replaceAll(" ", "-").toLowerCase()] = `(meta: ShipCardMeta) => compareString(meta.ship.nationality, '${k}')`
        debugMap["fn"]["nation"]["moreInfo"][k.replaceAll(" ", "-").toLowerCase()] = `(a: Ship) => a.nationality`
    })
    Object.keys(debugMap.debug.rarity).forEach((k) => {
        let dashed = k.replaceAll(" ", "-").toLowerCase()
        debugMap["ui"]["rarity"]["options"].push(
            {
                "value": dashed,
                "type": "check",
                "label": k
            })
        debugMap["fn"]["rarity"]["options"][k.replaceAll(" ", "-").toLowerCase()] = `(meta: ShipCardMeta) => compareString(meta.ship.rarity, '${k}')`
        debugMap["fn"]["rarity"]["moreInfo"][k.replaceAll(" ", "-").toLowerCase()] = `(a: Ship) => a.rarity`
    })


    let ext = 'json'
    let filename = 'debug'
    let path = './donotpassgo'
    console.log(`see ${path}/${filename}.${ext}`)
    fs.writeFileSync(`${path}/${filename}.${ext}`, JSON.stringify(debugMap));
}

function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}