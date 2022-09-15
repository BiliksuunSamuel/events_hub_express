import nodemailer from "nodemailer";
import configuration from "../configuration";

const Transporter = nodemailer.createTransport({
  port: configuration.mailPort,
  host: configuration.mailHost,
  secure: true,
  auth: {
    user: configuration.mailUser,
    pass: configuration.mailPassword,
  },
});

interface IProps {
  receiver: string;
  subject: string;
  text: string;
  html: string;
}
export function SendMail(info: IProps) {
  return new Promise(function (resolve, reject) {
    try {
      Transporter.sendMail(info)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
}
