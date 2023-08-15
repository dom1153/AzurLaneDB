import Dev from "@/hooks/useDevTools";
import { Ship } from "@azurapi/azurapi/build/types/ship";

type ShipRarity =
  | "Normal"
  | "Common"
  | "Rare"
  | "Epic"
  | "Elite"
  | "Super Rare"
  | "Priority"
  | "Ultra Rare"
  | "Decisive";

type HullType =
  | "Destroyer"
  | "Monitor"
  | "Light Cruiser"
  | "Heavy Cruiser"
  | "Aircraft Carrier"
  | "Battleship"
  | "Repair"
  | "Submarine"
  | "Light Carrier"
  | "Battlecruiser"
  | "Large Cruiser"
  | "Submarine Carrier"
  | "Munition Ship"
  | "Sailing Frigate"
  | "Unknown";

type HullTypeShortName =
  | "DD"
  | "BM"
  | "CL"
  | "CA"
  | "CV"
  | "BB"
  | "AR"
  | "SS"
  | "CVL"
  | "BC"
  | "CB"
  | "SSV"
  | "AE"
  | "IX"
  | "NA";

type NoFactionCode =
  | "SSSS"
  | "The Idolmaster"
  | "Kizuna AI"
  | "META"
  | "Dragon Empery"
  | "Utawarerumono"
  | "Atelier Ryza"
  | "Venus Vacation"
  | "Hololive";

type FactionShortName = "SSSS" | "IDOL" | "META" | "DE" | "AR" | "VV" | "HOLO";

export default class AzurApiUtils {
  static cardColorByRarity(ship: Ship) {
    switch (ship.rarity as ShipRarity) {
      case "Normal":
        // case "Common":
        return "gray.100";
      case "Rare":
        return "blue.100";
      case "Elite":
        // case "Epic":
        return "purple.100";
      case "Super Rare":
      case "Priority":
        return "yellow.100";
      case "Ultra Rare":
      case "Decisive":
        return "pink.100";
      default:
        if (Dev.isDev()) {
          throw new Error(`Custom: Unknown Ship Rarity: "${ship.rarity}"`);
        }
        return "white";
    }
  }

  static hullTypeToShortName(ship: Ship): HullTypeShortName {
    switch (ship.hullType as HullType) {
      case "Destroyer":
        return "DD";
      case "Monitor":
        return "BM";
      case "Light Cruiser":
        return "CL";
      case "Heavy Cruiser":
        return "CA";
      case "Aircraft Carrier":
        return "CV";
      case "Battleship":
        return "BB";
      case "Repair":
        return "AR";
      case "Submarine":
        return "SS";
      case "Light Carrier":
        return "CVL";
      case "Battlecruiser":
        return "BC";
      case "Large Cruiser":
        return "CB";
      case "Submarine Carrier":
        return "SSV";
      case "Munition Ship":
        return "AE";
      case "Sailing Frigate":
        return "IX";
      default:
        return "NA";
    }
  }

  static factionToShortName(ship: Ship): string {
    let code = ship.names.code;
    let firstWord = code.substring(0, code.indexOf(" "));
    // if all caps, return it
    if (
      !(firstWord === "" || [...firstWord].some((c) => c.toLowerCase() === c))
    ) {
      return firstWord;
    }

    switch (ship.nationality as NoFactionCode) {
      case "SSSS":
        return "SSSS";
      case "Kizuna AI":
        return "KAI";
      case "Utawarerumono":
        return "UTA";
      case "The Idolmaster":
        return "IDOL";
      case "Atelier Ryza":
        return "AR";
      case "Venus Vacation":
        return "VV";
      case "Dragon Empery":
        return "DE";
      case "Hololive":
        return "HOLO";
      case "META":
        return "META";
      default:
        return "NA";
    }
  }
}
