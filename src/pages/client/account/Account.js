import React from 'react';
import './style.css'
import avatar from '../../../images/avatar.png';

function Account() {
  return (
    <div className='account-container'>
      <div className='account-content'>
          <div className='avatar'>
            <img src={avatar} alt="avatar" />
          </div>
          <ul className='user-info'>
            <li>name: <span>abc</span></li>
            <li>birthday: <span>dd/MM/yyyy</span></li>
            <li>email: <span>gmail.com</span></li>
            <li>phone: <span>09xxxxxxxx</span></li>
            <li>username: <span>Ad***</span></li>
            <li><input type="button" value="change password"/> <input type="button" value="update info"/></li>
          </ul>
      </div>
    </div>
  )
}

export default Account