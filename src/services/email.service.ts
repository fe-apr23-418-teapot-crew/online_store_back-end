'use strict';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { EmailData } from '../types/emailData';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '0', 10),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const send = ({ email, subject, html }: EmailData) => {
  return transporter.sendMail({
    from: 'Auth API',
    to: email,
    subject,
    text: '',
    html,
  });
};

const sendActivationLink = (email: string, token: string) => {
  const link = `${process.env.CLIENT_URL}/activation/${token}`;

  return send({
    email,
    subject: 'Account activation',
    html: `
      <h1>Account activation</h1>
      <a href="${link}">${link}</a>
    `,
  });
};

export const emailService = {
  send,
  sendActivationLink,
};
