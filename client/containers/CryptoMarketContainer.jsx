import React, { Component } from 'react';

// import { Switch, Route } from 'react-router-dom';
// import MainContainer from './containers/MainContainer.jsx';

const CurrencyMarketContainer = props => {
  const [currencies, setCurrencies] = React.useState(0);

  React.useEffect(() => {
    fetch('https://api.coincap.io/v2/assets', {method: 'GET'})
      .then(response => response.json())
      .then(data => {
        console.log(data.timestamp)
        setCurrencies(JSON.stringify(data));
      })
      .catch(err => console.log(err));
  });

  return(
    <div>
      <main>
        {currencies}
      </main>
    </div>
  )
}


export default CurrencyMarketContainer;
