import * as React from 'react';
import { IRepo } from '../../types';

import './repo-details.less';

interface IRepoDetailsComponentProps {
  repoData: IRepo;
}

export const RepoDetailsComponent: React.SFC<IRepoDetailsComponentProps> = (props: IRepoDetailsComponentProps) => {
  return <div className='repo-details'>
    <h2 className = 'repo-details__name'>{props.repoData.name}</h2>
    <p className='repo-details__description'>
      {props.repoData.description}
    </p>
    <ul>
      <li className='repo-details__row'>Full name: {props.repoData.full_name}</li>
      <li className='repo-details__row'>Stars: {props.repoData.stargazers_count}</li>
      <li className='repo-details__row'>Issues count: {props.repoData.open_issues_count}</li>
      <li className='repo-details__row'>{props.repoData.private ? 'Private' : 'Public'}</li>
      <li className='repo-details__row'>Forks count: {props.repoData.forks_count}</li>
      <li className='repo-details__row'>Language: {props.repoData.language}</li>
      <li className='repo-details__row'><a href={props.repoData.html_url} target='_blank'>Open on github</a></li>
    </ul>
  </div>;
};
