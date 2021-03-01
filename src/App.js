import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <Home/>
      <h3>Made with ❤️ by  
      <a onClick={() => window.open('https://github.com/EraOfCoding', '_blank')}> Yerassyl</a></h3>
    </div>
  );
}

export default App;
