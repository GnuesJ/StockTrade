import React, { Component } from 'react';

import UserContainer from './containers/UserContainer.jsx';

// import { Switch, Route } from 'react-router-dom';
// import MainContainer from './containers/MainContainer.jsx';

const App = props => {

  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [buyPower, setBuyPower] = React.useState();
  const [totalInvested, setTotalInvested] = React.useState();


  // React.useEffect(() => {
  //   console.log('fetching app')
  //   fetch('/api/user', {method: 'GET'})
  //     .then(response => response.json())
  //     .then(data => {
  //       setFirstName(data.firstName);
  //       setLastName(data.lastName);
  //       setBuyPower(data.buyPower);
  //       setTotalInvested(data.totalInvested);
  //     })
  //     .catch();
  // })
  React.useEffect(() => {
    fetch('https://api.coincap.io/v2/assets', {method: 'GET'})
      .then(response => response.json())
      .then(data => {
        console.log(data.data)

        // setCurrencies(JSON.stringify(data));
      })
      .catch(err => console.log(err));
  })
  
  return(
    <div>
      <main>
        <UserContainer />
      </main>
    </div>
  )
}

export default App;
// class App extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return(
//       <div>asdas
//       </div>
//     );
//   }
// }



//<MainContainer />