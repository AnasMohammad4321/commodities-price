const CommodityService = require("./services/CommodityService");
const cron = require("node-cron");
require("dotenv").config();

class EmailScheduler {
  constructor() {
    this.commodityService = new CommodityService();
  }

  async sendHourlyEmail() {
    console.log("📩 Fetching and sending Gold price email...");
    await this.commodityService.getPrice("XAU", true);
  }

  start() {
    console.log("⏳ Email Scheduler Started! Emails will be sent every hour.");

    cron.schedule("0 * * * *", () => {
      this.sendHourlyEmail();
    });

    this.sendHourlyEmail();
  }
}

new EmailScheduler().start();
