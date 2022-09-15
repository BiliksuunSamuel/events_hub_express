import cloudinary from "cloudinary";
import { cloudinaryConfiguration } from "../configuration";
import fs from "fs";
export function UploadImage(file: any) {
  return new Promise<cloudinary.UploadApiResponse>(function (resolve, reject) {
    try {
      cloudinary.v2.uploader.upload(
        file,
        { ...cloudinaryConfiguration, folder: "eventshub" },
        (error, results: any) => {
          error && reject(error);
          resolve(results);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

export function ConvertToDataURL(file: any) {
  return new Promise(function (resolve, reject) {
    try {
      resolve(Buffer.from(file).toString("base64"));
    } catch (error) {
      reject(error);
    }
  });
}
