import LoginScreen from './ScreensAndComponents/LoginScreen';
import PortfolioForm from './ScreensAndComponents/PortfolioForm.js';
import {BrowserRouter,Route} from 'react-router-dom';
function App() {
  
  return (
    <BrowserRouter>
    <main>
    <Route path='/login' component={LoginScreen}></Route>
    <Route path='/form' component={PortfolioForm}></Route>
    </main>
    </BrowserRouter>
  );
}

export default App;
