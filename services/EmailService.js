const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.SMTP_HOST,
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendPriceEmail(priceData) {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.EMAIL_TO,
      subject: `Gold Price Update - ${priceData.updatedAtReadable}`,
      html: `
        <h2>Gold Price Update</h2>
        <p><strong>Commodity:</strong> ${priceData.name} (${priceData.symbol})</p>
        <p><strong>Price:</strong> $${priceData.price} USD</p>
        <p><strong>Last Updated:</strong> ${priceData.updatedAtReadable}</p>
        <br>
        <p>📩 Sent via Commodity Price CLI</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully to:", process.env.EMAIL_TO);
    } catch (error) {
      console.error("❌ Error sending email:", error.message);
    }
  }
}

module.exports = EmailService;
