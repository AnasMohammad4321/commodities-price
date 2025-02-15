const axios = require("axios");
const EmailService = require("./EmailService");

class CommodityService {
  constructor() {
    this.BASE_URL = process.env.BASE_URL;
    this.emailService = new EmailService();
  }

  async getSymbols() {
    try {
      const response = await axios.get(`${this.BASE_URL}/symbols`);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching symbols:", error.message);
      return [];
    }
  }

  async getPrice(symbol, sendEmail = false) {
    try {
      const response = await axios.get(`${this.BASE_URL}/price/${symbol}`);
      const data = response.data;

      console.log(`\n💰 ${data.name} (${data.symbol}): $${data.price} USD`);
      console.log(`🕒 Last Updated: ${data.updatedAtReadable}\n`);

      if (sendEmail) {
        await this.emailService.sendPriceEmail(data);
      }
    } catch (error) {
      console.error(`❌ Error fetching price for ${symbol}:`, error.message);
    }
  }
}

module.exports = CommodityService;
