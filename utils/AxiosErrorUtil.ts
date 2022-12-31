import { IErrorResponse } from '../models/IErrorResponse';
import axios, { AxiosError } from 'axios';
export class AxiosErroUtil {
  static onErro(obj: any): IErrorResponse {
    if (!axios.isAxiosError(obj)) {
      return {
        errors: [],
        message: 'Client error',
        timeStamp: new Date(),
        status: 'Client erro',
      } as IErrorResponse;
    }
    const err: AxiosError<IErrorResponse> = obj;

    if (!err.response)
      return {
        errors: [],
        message: 'Client error',
        timeStamp: new Date(),
        status: err.status,
      } as IErrorResponse;

    const data: IErrorResponse = err.response.data;

    data.timeStamp = new Date(data.timeStamp);
    return data
  }
}
