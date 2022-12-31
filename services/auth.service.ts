import { IAuthResponse } from '../models/auth/IAuthResponse';
import axios from 'axios';

import { IErrorResponse } from '../models/IErrorResponse';
import { ILogin } from '../models/auth/ILogin';
import { IRegister } from '../models/auth/IRegister';
import { AxiosErroUtil } from '../utils/AxiosErrorUtil';
import { ServiceBase } from './service.base';

export class AuthService extends ServiceBase {
  public async login(iLogin: ILogin): Promise<true | IErrorResponse> {
    try {
      const { data } = await axios.post('auth/login', iLogin);

      if (data.errors != undefined && data.errors != null) {
        return data;
      }

      const authResponse: IAuthResponse = data;
      this.setToken(authResponse.token);
      this.setPermissions(authResponse.permissions);
      return true;
    } catch (err: any) {
      return AxiosErroUtil.onErro(err);
    }
  }

  public async register(iRegister: IRegister): Promise<true | IErrorResponse> {
    try {
      const { data } = await axios.post('auth/register', iRegister);
      if (data.errors != undefined && data.errors != null) {
        return data;
      }
      return true;
    } catch (err) {
      return AxiosErroUtil.onErro(err);
    }
  }

  static getToken(): string | null {
    return localStorage.getItem('auth-token');
  }

  static getPermissions(): string[] {
    const temp = localStorage.getItem('auth-permissions');
    try {
      return temp ? JSON.parse(temp) : [];
    } catch (err) {
      return [];
    }
  }

  private setToken(token: string) {
    localStorage.setItem('auth-token', token);
  }

  private setPermissions(permissions: string[]) {
    localStorage.setItem('auth-permissions', JSON.stringify(permissions));
  }

  static logout() {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-permissions');
  }

  static isLogged(): boolean {
    const token = AuthService.getToken();
    const permissions = AuthService.getPermissions();
    const isLogged =
      token != null && token.startsWith('Bearer') && permissions.length != 0;
    if (!isLogged) AuthService.logout();
    return isLogged;
  }
}
