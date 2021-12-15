import LoginScreen from './ScreensAndComponents/LoginScreen';
import PortfolioForm from './ScreensAndComponents/PortfolioForm.js';
import MainPage from './ScreensAndComponents/MainPage.js';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
function App() {
  
  return (
    <BrowserRouter>
    <main>
     <Switch>
     <Route path='/' exact={true} component={LoginScreen}></Route>
     <Route path='/form' exact={true} component={PortfolioForm}></Route>
     <Route path='/mainPage' exact={true} component={MainPage}></Route> 
     </Switch>
    </main>
    </BrowserRouter>
  );
}

export default App;
