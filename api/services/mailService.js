import nodemailer from 'nodemailer';
import config from '../config';
import log from '../services/logService';

const { EMAIL_USERNAME, EMAIL_PASSWORD } = config;

/**
 * Sends email to requested recipient
 *
 * @param {String} to - Email string
 * @param {String} subject - Email subject
 * @param {String} text - Email text
 * @param {String} html - Email html string
 * @author Snær Seljan Þóroddsson
 */
export default async function sendMail(to, subject, text, html) {
  // Create transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
  });

  // Email options
  const mailOptions = {
    from: EMAIL_USERNAME,
    to,
    subject,
    text,
    html,
  };

  try {
    // Send mail
    const info = await transporter.sendMail(mailOptions);
    return Promise.resolve(info);
  } catch (err) {
    log.error({ err }, 'Error sending email');
  }
}
