import LoginScreen from './ScreensAndComponents/LoginScreen';
import {BrowserRouter,Route} from 'react-router-dom';
function App() {
  
  return (
    <BrowserRouter>
    <main>
    <Route path='/' component={LoginScreen}></Route>
    </main>
    </BrowserRouter>
  );
}

export default App;
