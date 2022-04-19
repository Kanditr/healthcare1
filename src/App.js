// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import { Amplify } from "aws-amplify";

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { API, Auth } from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App({ signOut, user }) {
  async function callApi() {
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    console.log({ token });

    const requestInfo = {
      headers: {
        Authorization: token,
      },
    };

    const data = await API.get("healthcareapi", "/hello", requestInfo);
    console.log({ data });
  }
  return (
    <>
      <h1>Hi {user.username}</h1>
      <button onClick={callApi}>Call API</button>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App);
