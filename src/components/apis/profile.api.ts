import { ApiBase } from './api.base';
import { IRepo } from '../../types';

class ProfileApi extends ApiBase{
  loadRepos(url: string): Promise<IRepo> {
    return this.fetch<IRepo>(url);
  }
}

export { ProfileApi };
