import { Provider } from 'react-redux';
import './App.css';
import store from './Store';
import HomePage from './components/HomePage';



function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <HomePage />
      </div>
    </Provider>
  );
}

export default App;
