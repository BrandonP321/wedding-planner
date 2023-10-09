/**
 * This is a temporary way of sending emails to a
 * list of vendors until we have a proper email service.
 */

import * as fs from "fs";
import * as nodemailer from "nodemailer";
import csv from "csv-parser";
import Mail from "nodemailer/lib/mailer";
import {
  EmailTemplate,
  EmailSubjectTemplate,
} from "./emailAddresses/emailTemplate";
import dotenv from "dotenv";

dotenv.config();

const CSV_PATH = __dirname + "/emailAddresses/vendors.csv";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "brandon.phillips@bphillips.dev",
    pass: process.env.EMAIL_AUTH_PASS,
  },
});

const sendEmail = (row: Record<string, string>, email: string) => {
  let modifiedEmail = EmailTemplate;

  for (const key in row) {
    modifiedEmail = modifiedEmail.replace(`{{${key}}}`, row[key]);
  }

  const mailOptions: Mail.Options = {
    from: "brandon.phillips@bphillips.dev",
    to: email,
    subject: EmailSubjectTemplate,
    html: modifiedEmail,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`Error sending email to ${email}:`, error);
    } else {
      console.log(`Email sent to ${email}: ${info.response}`);
    }
  });
};

fs.createReadStream(CSV_PATH)
  .pipe(csv())
  .on("data", (row: Record<string, string>) => {
    sendEmail(row, row.Email);
  })
  .on("end", () => {
    console.log("CSV file successfully processed.");
  });
