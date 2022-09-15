import { IAdminModel } from "../interface";
import { AdminModel } from "./../database/model/index";

export function GetAdminByEmail<T>(email: string = "") {
  return new Promise<T>(function (resolve, reject) {
    try {
      AdminModel.findOne({ email }, (error: Error, results: T) => {
        error && reject(error);
        resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function AddAdminInfo<T>(info: IAdminModel) {
  return new Promise<T>(function (resolve, reject) {
    try {
      const Info = new AdminModel(info);
      Info.validate()
        .then(async () => {
          await Info.save();
          resolve(Info as T);
        })
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
}

export function GetAdminById<T>(id: string = "") {
  return new Promise<T>(function (resolve, reject) {
    try {
      AdminModel.findOne({ id }, (error: Error, results: T) => {
        error && reject(error);
        resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function GetAdmins<T>() {
  return new Promise<T>(function (resolve, reject) {
    try {
      AdminModel.find((error: Error, results: T) => {
        error && reject(error);
        resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function UpdateAdminInfo(info: IAdminModel) {
  return new Promise<boolean>(function (resolve, reject) {
    try {
      AdminModel.findOneAndUpdate(
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
