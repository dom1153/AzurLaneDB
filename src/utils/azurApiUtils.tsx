import Dev from "@/hooks/useDevTools";
import { Ship } from "@azurapi/azurapi/build/types/ship";

import Assets from "@assets/asset_index";

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
        return "gray.300";
      case "Rare":
        return "blue.200";
      case "Elite":
        // case "Epic":
        return "purple.200";
      case "Super Rare":
      case "Priority":
        return "yellow.200";
      case "Ultra Rare":
      case "Decisive":
        return "pink.200";
      default:
        if (Dev.isDev()) {
          throw new Error(`Custom: Unknown Ship Rarity: "${ship.rarity}"`);
        }
        return "white";
    }
  }

  static resumeBgByRarity(ship: Ship) {
    switch (ship.rarity as ShipRarity) {
      case "Normal":
        return Assets.detail_bg_gray;
      case "Rare":
        return Assets.detail_bg_blue;
      case "Elite":
        return Assets.detail_bg_purp;
      case "Super Rare":
        return Assets.detail_bg_gold;
      case "Priority":
        return Assets.detail_bg_gold_pr;
      case "Ultra Rare":
        return Assets.detail_bg_gay;
      case "Decisive":
        return Assets.detail_bg_gay_pr;
      default:
        if (Dev.isDev()) {
          throw new Error(`Custom: Unknown Ship Rarity: "${ship.rarity}"`);
        }
        return Assets.detail_bg_gray;
    }
  }

  static cardBgByRarity(ship: Ship) {
    switch (ship.rarity as ShipRarity) {
      case "Normal":
        return Assets.detail_bg_gray_card;
      case "Rare":
        return Assets.detail_bg_blue_card;
      case "Elite":
        return Assets.detail_bg_purp_card;
      case "Super Rare":
        return Assets.detail_bg_gold_card;
      case "Priority":
        return Assets.detail_bg_gold_pr_card;
      case "Ultra Rare":
        return Assets.detail_bg_gay_card;
      case "Decisive":
        return Assets.detail_bg_gay_pr_card;
      default:
        if (Dev.isDev()) {
          throw new Error(`Custom: Unknown Ship Rarity: "${ship.rarity}"`);
        }
        return Assets.detail_bg_gray;
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
