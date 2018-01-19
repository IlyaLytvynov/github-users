import { ApiBase } from './api.base';
import { IRepo } from '../../types';

class ReposApi extends ApiBase{
  loadRepos(url: string): Promise<IRepo> {
    return this.fetch<IRepo>(url);
  }
}

export { ReposApi };
