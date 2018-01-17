import * as React from 'react';
import { IRepo } from '../../types';

import './repo-list.less';

interface IReposListProps {
  repos: Array<IRepo>;
  onClick: (id: number) => void;
}

export const ReposListComponent: React.SFC<IReposListProps> = (props: IReposListProps) => {
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
};
