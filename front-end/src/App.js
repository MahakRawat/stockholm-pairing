import LoginScreen from './ScreensAndComponents/LoginScreen';
import PortfolioForm from './ScreensAndComponents/PortfolioForm.js';
import {BrowserRouter,Route} from 'react-router-dom';
function App() {
  
  return (
    <BrowserRouter>
    <main>
     <Route path='/' exact={true} component={LoginScreen}></Route>
      <Route path='/form' exact={true} component={PortfolioForm}></Route>
     {/* <Route path='/mainPage' exact={true} component={MainPage}></Route> */}
    </main>
    </BrowserRouter>
  );
}

export default App;
