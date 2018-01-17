import { ApiBase } from './api.base';
import { IProfileDetailed,IReposResponse } from '../../types';

import { config } from '../../configs/app.config';

class ProfileApi extends ApiBase{
  getProfileDetails(url: string): Promise<IProfileDetailed> {
    return this.fetch<IProfileDetailed>(url);
  }

  loadRepos(url: string): Promise<IReposResponse> {
    return this.fetch<IReposResponse>(url);
  }
}

export { ProfileApi };
