import { CommentModel } from "../database/model";
import { ICommentModel } from "../interface";

export function GetComments<T>() {
  return new Promise<T>(function (resolve, reject) {
    try {
      CommentModel.find((error: Error, results: T) => {
        error && reject(error);
        resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function AddComment(info: ICommentModel) {
  return new Promise(function (resolve, reject) {
    try {
      const Info = new CommentModel(info);
      Info.validate()
        .then(() => {
          Info.save();
          resolve(Info);
        })
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
}
