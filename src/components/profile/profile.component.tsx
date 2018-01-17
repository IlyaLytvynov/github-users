import * as React from 'react';
import { Link } from 'react-router-dom';
import './user.less';
import { IProfileDetailed } from '../../types';

export interface IProfileProps {
  profileData: IProfileDetailed;
}

const style = {
  display: 'block'
};

const ProfileComponent: React.SFC<IProfileProps> = (props) => {
  if (props.profileData === undefined) {
    return <div>loading...</div>;
  }
  const {login, avatar_url, followers, following, public_repos, name} = props.profileData;

  return (
    <article className='user'>
      <div className='user__picture'>
        <button className='user__picture-btn'>
          <img className='user__picture-img' src={avatar_url} alt='userpicture'/>
        </button>
      </div>
      <div className='user__description'>
        <div className='user__head'>
          <h2 className='user__username'>{login}</h2>
        </div>
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
    </article>
  );
};

export { ProfileComponent };