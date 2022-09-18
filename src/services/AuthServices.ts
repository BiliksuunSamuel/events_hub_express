import { Error } from "mongoose";
import { AuthModel } from "./../database/model/index";
import { IAuthModel } from "./../interface/index";

//add auth info
export function AddAuthInfo<T>(info: IAuthModel) {
  return new Promise<T>(function (resolve, reject) {
    try {
      const Info = new AuthModel(info);
      Info.validate()
        .then(() => {
          Info.save();
          resolve(Info as T);
        })
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
}

export function GetAuthInfoByUserId<T>(id: string) {
  return new Promise<T>(function (resolve, reject) {
    try {
      AuthModel.findOne({ userId: id }, (error: Error, results: T) => {
        error && reject(error);
        resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function UpdateAuthInfo(info: IAuthModel) {
  return new Promise(function (resolve, reject) {
    try {
      AuthModel.findOneAndUpdate(
        { userId: info.userId },
        { password: info.password, otp: info.otp },
        (error: Error) => {
          error && reject(error);
          resolve(true);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}
