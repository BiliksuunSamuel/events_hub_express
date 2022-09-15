import { Error } from "mongoose";
import { IUserModel } from "../interface";
import { UserModel } from "./../database/model/index";

export function GetUserByEmailAddress<T>(email: string = "") {
  return new Promise<T>(function (resolve, reject) {
    try {
      UserModel.findOne({ email }, (error: Error, results: T) => {
        error && reject(error);
        resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function GetUserById<T>(id: string = "") {
  return new Promise<T>(function (resolve, reject) {
    try {
      UserModel.findOne({ id }, (error: Error, results: T) => {
        error && reject(error);
        resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function GetUsers<T>() {
  return new Promise<T>(function (resolve, reject) {
    try {
      UserModel.find((error: Error, results: T) => {
        error && reject(error);
        resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function AddNewUser<T>(info: IUserModel) {
  return new Promise<T>(async function (resolve, reject) {
    try {
      const Info = new UserModel(info);
      await Info.save();
      resolve(Info as T);
    } catch (error) {
      reject(error);
    }
  });
}

export function ValidateUserInfo(info: IUserModel) {
  return new Promise(function (resolver, reject) {
    UserModel.findOneAndUpdate(
      { email: info.email },
      { authenticated: info.authenticated },
      (error: Error) => {
        error && reject(error);
        resolver(true);
      }
    );
  });
}

export function UpdateUserInfo(info: IUserModel) {
  return new Promise(function (resolve, reject) {
    try {
      UserModel.findOneAndUpdate(
        { email: info.email },
        { ...info },
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
