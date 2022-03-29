import React from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

const Home = () => {
  return (
    <div className="pt-5 px-5">
      <FilePond></FilePond>
    </div>
  );
};

export default Home;
