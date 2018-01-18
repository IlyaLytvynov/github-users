import { ApiBase } from './api.base';
import { IProfileDetailed} from '../../types';

import { config } from '../../configs/app.config';

export class AuthApi extends ApiBase {
  login(username: string): Promise<IProfileDetailed> {
    const url = `${config.apiUrl}/users/${username}`;
    return this.fetch<IProfileDetailed>(url);
  }
}