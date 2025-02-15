#!/usr/bin/env node

const inquirer = require("inquirer").default;
const CommodityService = require("./services/CommodityService");
require("dotenv").config();

class CommodityCLI {
  constructor() {
    this.commodityService = new CommodityService();
  }

  async showMenu() {
    console.log("\n🌍 Welcome to the Commodity Price CLI!\n");

    while (true) {
      const { action } = await inquirer.prompt([
        {
          type: "list",
          name: "action",
          message: "Choose an option:",
          choices: [
            "💰 Get Gold Price (XAU)",
            "📩 Send Gold Price Email",
            "🚪 Exit",
          ],
        },
      ]);

      switch (action) {
        case "💰 Get Gold Price (XAU)":
          await this.commodityService.getPrice("XAU");
          break;
        case "📩 Send Gold Price Email":
          await this.commodityService.getPrice("XAU", true);
          break;
        case "🚪 Exit":
          console.log("👋 Exiting... Have a great day!");
          return;
        default:
          console.log("❌ Invalid option! Try again.");
      }
    }
  }
}

// Start CLI
new CommodityCLI().showMenu();
