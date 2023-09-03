import React from 'react';
import S3Uploader from './components/uploader';

const Home: React.FC = () => {
  return (
    <div>
      <h1>S3 Image Uploader</h1>
      <S3Uploader />
    </div>
  );
};

export default Home;
