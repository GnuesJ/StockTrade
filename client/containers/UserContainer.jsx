import React, { Component } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import { addCount } from "./store/counter/actions";
// import { Switch, Route } from 'react-router-dom';
// import MainContainer from './containers/MainContainer.jsx';

const UserContainer = props => {
  // const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();
  // if(userInfo)
  //   string+=userInfo.firstName

  return(
    <div>
      <main>
        {/* <h1>{firstName} {lastName}</h1>
        <h2>Buy Power: {buyPower}</h2>
        <h2>Total Invested: {totalInvested}</h2> */}
      </main>
    </div>
  )
}

export default UserContainer;