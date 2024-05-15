// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div>
      <h1>Farm-to-table</h1>
      <form action="">
        <input type="text" placeholder="name" />
        <input type="email" placeholder="email" />
        <button type="submit">sign in</button>
        <button type="submit">sign up </button>
      </form>
    </div>
  );
}

export default App;
