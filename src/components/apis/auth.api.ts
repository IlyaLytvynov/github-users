import { ApiBase } from './api.base';
import { IProfileDetailed} from '../../types';

import { config } from '../../configs/app.config';

export class AuthApi extends ApiBase {
  login(username: string) {
    const url = `${config.apiUrl}/users/${username}?access_token=${config.appToken}`;
    return this.fetch<IProfileDetailed>(url);
  }
}