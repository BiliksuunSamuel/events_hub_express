import nodemailer from "nodemailer";
import configuration from "../configuration";

const Transporter = nodemailer.createTransport({
  port: configuration.mailPort,
  host: configuration.mailHost,
  secure: false,
  auth: {
    user: configuration.mailUser,
    pass: configuration.mailPassword,
  },
});

interface IProps {
  receiver: string[];
  subject: string;
  text: string;
  html: string;
}
export function SendMail(info: IProps) {
  return new Promise(function (resolve, reject) {
    try {
      Transporter.sendMail({ ...info, to: info.receiver })
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
}
