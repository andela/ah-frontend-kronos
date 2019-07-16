import React from 'react';
import '../../assets/scss/Loading.scss';
import loading from '../../assets/gif/loading.gif';

const Loading = () => (
  <div className="loader">
    <img alt="loading..." src={loading} />
  </div>
);

export default Loading;
