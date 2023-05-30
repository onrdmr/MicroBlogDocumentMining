import React, { Component, useState } from 'react';
import LoadingPage from './LoadingPage';
const FetchData = () => {
  const [loading, setLoading]= useState(true) ;

  return (
    <>
      <LoadingPage></LoadingPage>
    </>
  );

} 

export default FetchData