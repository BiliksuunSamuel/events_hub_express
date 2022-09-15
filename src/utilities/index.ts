import bcrypt from "bcrypt";
import otp from "otp-generator";
import { v4 as uuid } from "uuid";
export function GenerateOTP(len: number = 6) {
  return otp.generate(len, {
    specialChars: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
  });
}

export function HashPassword(password: string = "") {
  return new Promise<string>(function (resolve, reject) {
    try {
      bcrypt.hash(password, 10, (error, hash) => {
        error && reject(error);
        resolve(hash);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function GenerateId() {
  return uuid().toString();
}

export function VerifyPassword(password: string = "", hpassword: string = "") {
  return new Promise<boolean>(function (resolve, reject) {
    try {
      bcrypt.compare(password, hpassword, (error, match) => {
        error && reject(error);
        resolve(match);
      });
    } catch (error) {
      reject(error);
    }
  });
}
