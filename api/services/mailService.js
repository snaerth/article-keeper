import nodemailer from 'nodemailer';
import config from '../../config';

const { EMAIL_USERNAME, EMAIL_PASSWORD } = config;

/**
 * Sends email to requested recipient
 *
 * @param {String} to - Email string
 * @param {String} subject - Email subject
 * @param {String} text - Email text
 * @param {String} html - Email html string
 * @param {Function} callback - Callback function
 * @author Snær Seljan Þóroddsson
 */
export default function sendMail(to, subject, text, html, callback) {
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

  // Send mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      callback(error, info);
    }

    callback(null, info);
  });
}
