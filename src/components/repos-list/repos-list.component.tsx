import * as React from 'react';
import { IReposResponse } from '../../types';
interface IReposListProps {
  repos: Array<IReposResponse>
}

export const ReposListComponent: React.SFC<IReposListProps> = (props: IReposListProps) => {
  const repos = props.repos.map((repo: IReposResponse,i) => {
    return <li key={i}>{repo.name}</li>;
  });

  return <ul className='repos-list'>
    {repos}
  </ul>
};