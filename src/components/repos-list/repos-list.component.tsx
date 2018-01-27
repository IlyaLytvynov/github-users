import * as React from 'react';
import { IRepo } from '../../types';
import { observer } from 'mobx-react';

import { LoaderComponent } from '../loader/loader.component';
import { ReposUiStore } from '../../stores';

import './repo-list.less';

interface IReposListProps {
  repos: Array<IRepo>;
  store: ReposUiStore
  onClick: (id: number) => void;
  isLoading?: boolean;
}


export const ReposListComponent: React.SFC<IReposListProps> = observer((props: IReposListProps) => {
  if (props.store.isLoading === true) {
    return <LoaderComponent />
  }
  if(props.repos.length === 0) {
    return <h3>No one any repos yet...</h3>
  }

  const repos = props.repos.map((repo: IRepo, i) => {
    return <li key={i} className='repos-list__item' onClick={() => {
      props.onClick(repo.id)
    }}>
      <span className='repos-list__name'>{repo.name}</span>
      <span className='repos-list__languages'>{repo.language}</span>
    </li>;
  });

  return <div className='repos-list'>
    <h3 className='repos-list__title'>Repositories: </h3>
    <ul className='repos-list__items'>
      {repos}
    </ul>
  </div>
});
