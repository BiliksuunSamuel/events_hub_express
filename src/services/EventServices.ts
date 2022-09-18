import { Error } from "mongoose";
import { EventModel } from "./../database/model/index";
import { IEventModel } from "./../interface/index";

export function AddEvent<T>(info: IEventModel) {
  return new Promise<T>(async function (resolve, reject) {
    try {
      const Info = new EventModel(info);
      await Info.save();
      resolve(Info as T);
    } catch (error) {
      reject(error);
    }
  });
}

export function GetEventById<T>(id: string) {
  return new Promise<T>((resolve, reject) => {
    try {
      EventModel.findOne({ id }, (error: any, results: T) => {
        error && reject(error);
        resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function UpdateEventInfo(info: IEventModel) {
  return new Promise(function (resolve, reject) {
    try {
      EventModel.findOneAndUpdate(
        { id: info.id },
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

export function GetEvents<T>() {
  return new Promise<T>(function (resolve, reject) {
    try {
      EventModel.find((error: Error, results: T) => {
        error && reject(error);
        resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function DeleteEvent(id: string) {
  return new Promise(function (resolve, reject) {
    try {
      EventModel.findOneAndDelete({ id }, (error: Error) => {
        error && reject(error);
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });
}
