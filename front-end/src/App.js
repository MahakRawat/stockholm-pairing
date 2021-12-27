import LoginScreen from './ScreensAndComponents/LoginScreen';
import PortfolioForm from './ScreensAndComponents/PortfolioForm.js';
import MainPage from './ScreensAndComponents/MainPage.js';
import ChatScreen from './ScreensAndComponents/ChatScreen.js';
import {BrowserRouter,Redirect,Route,Switch} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Profile from './ScreensAndComponents/Profile';
function App() {
   const user=useSelector(state=>state);
   console.log(user);
  return (
    <BrowserRouter>
    <main>
     <Switch>
     <Route path='/' exact={true} component={LoginScreen}></Route>
     <Route path='/form' exact={true} component={PortfolioForm}></Route>
     <Route path='/mainPage' exact={true}>{user.user_name?<MainPage></MainPage>:<Redirect to="/"></Redirect>}</Route> 
     <Route path='/chat' exact={true}>{user.user_name?<ChatScreen></ChatScreen>:<Redirect to="/"></Redirect>}</Route>
     <Route path='/profile' exact={true}>{user.user_name?<Profile></Profile>:<Redirect to="/"></Redirect>}</Route>
     </Switch>
    </main>
    </BrowserRouter>
  );
}

export default App;
