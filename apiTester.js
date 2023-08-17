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
        rarity: {},
        hullType: {},
        oddShortCode: {},
        shortCode: {},
        voiceActors: {},
        illustrators: {},
    },
    ui: {
        nation: {
            options: []
        },
        rarity: {
            options: []
        },
        hullType: {
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
        },
        hullType: {
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
        debugMap.debug.hullType[s.hullType] = s.names.en
        let meta = {}
        if (s.misc.artist) {
            meta.artist = [s.misc.artist.name, s.misc.artist.urls]
        }
        if (s.misc.voice) {
            meta.voice = [s.misc.voice.name, s.misc.voice.url]
        }
        debugMap.debug.illustrators[s.names.en] = meta


        // artist ?: Artist;
        // web ?: Artist;
        // pixiv ?: Artist;
        // twitter ?: Artist;
        // voice ?: Artist;)

        if (s.names.code) {
            let code = s.names.code
            let firstWord = code.substr(0, code.indexOf(" "));
            if ([...firstWord].some((c) => c.toLowerCase() === c) || firstWord === "") {
                // console.log("odd name:", s.names.code, s.nationality)
                debugMap.debug.oddShortCode[s.nationality] = s.names.code
            } else {
                if (firstWord === "")
                    console.log(firstWord, s.names.code)
                debugMap.debug.shortCode[firstWord] = s.names.code
            }
        } else {
            console.log("error on ", s.names.en)
        }
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
    Object.keys(debugMap.debug.hullType).forEach((k) => {
        let dashed = k.replaceAll(" ", "-").toLowerCase()
        debugMap["ui"]["hullType"]["options"].push(
            {
                "value": dashed,
                "type": "check",
                "label": k
            })
        debugMap["fn"]["hullType"]["options"][k.replaceAll(" ", "-").toLowerCase()] = `(meta: ShipCardMeta) => compareString(meta.ship.hullType, '${k}')`
        debugMap["fn"]["hullType"]["moreInfo"][k.replaceAll(" ", "-").toLowerCase()] = `(a: Ship) => a.hullType`
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