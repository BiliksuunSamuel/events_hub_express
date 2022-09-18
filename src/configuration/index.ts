import dotenv from "dotenv";

import cloudinary from "cloudinary";
dotenv.config();

export const cloudinaryConfiguration = cloudinary.v2.config({
  cloud_name: "bhills",
  api_key: "332227748632362",
  api_secret: "DbNdOWLRZ_Xm96Hj--ns1149k20",
});

export default {
  port: process.env.PORT || process.env.port,
  dbURL:
    process.env.dbURL ||
    "mongodb+srv://samuelbills:77045109@cluster0.nakki.mongodb.net/eventshub",
  mailHost: process.env.mailHost,
  mailPassword: process.env.mailPassword || "jtzmzcvqiypfvbjz",
  mailPort: 587, //465
  mailUser: process.env.mailUser,
};
