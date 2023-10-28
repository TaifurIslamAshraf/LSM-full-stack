import ejs from "ejs";
import nodemailer, { Transporter } from "nodemailer";
import path from "path";

import { IEmailOption } from "../../@types/EmailOptions";
import config from "../config/config";

const sendMail = async (option: IEmailOption): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    service: config.smtpService,
    auth: {
      user: config.smtpMail,
      pass: config.smtpPassword,
    },
  });

  const { email, subject, templete, data } = option;

  const templetePath = path.join(__dirname, "../../views", templete);

  //render the mail templete with ejs
  const html: string = await ejs.renderFile(templetePath, data);

  const mailOptions = {
    from: config.smtpMail,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;
