import * as React from 'react';
import { Link } from 'react-router-dom';
import './profile.less';
import { IProfileDetailed } from '../../types';

export interface IProfileProps {
  profileData: IProfileDetailed;
}

export const ProfileComponent: React.SFC<IProfileProps> = (props) => {
  if (props.profileData === undefined) {
    return <div>loading...</div>;
  }
  const {login, avatar_url, followers, following, public_repos, name} = props.profileData;

  return (
    <article className='profile'>
      <div className='profile__picture'>
        <button className='profile__picture-btn'>
          <img className='profile__picture-img' src={avatar_url} alt='profilepicture'/>
        </button>
      </div>
      <div className='profile__description'>
        <div className='profile__head'>
          <h2 className='profile__username'>{login}</h2>
        </div>
        <ul className='profile__statistic'>
          <li className='profile__counts profile__posts-count'>
            <span className='text_bold'>{followers}</span> followers
          </li>
          <li className='profile__counts profile__followers-count'>
            <span className='text_bold'>{following}</span> followings
          </li>
          <li className='profile__counts profile__following-count'>
            <span className='text_bold'>{public_repos}</span> repos
          </li>
        </ul>
        <h2 className='profile__fullname'>{name}</h2>
      </div>
    </article>
  );
};
