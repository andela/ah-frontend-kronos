import React from 'react';

const SocialLoginSuccess = () => (
  <div>
    <div>
      <h1 className="app">
        {sessionStorage.getItem('user_email')}
        <br />
          Congrats!! You have successfully Logged in with your social Account.
      </h1>
    </div>
  </div>
);

export default SocialLoginSuccess;
