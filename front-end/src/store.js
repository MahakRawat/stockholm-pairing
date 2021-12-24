import {createStore} from 'redux';


export const userInfoAction= (data)=>{
   //localStorage.setItem('userInfo',JSON.stringify(data));
  return ({
      type: 'userInfoUpdated',
      payload: data
  });
}
const initialState= /*localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):*/{};

const userInfoReducer =(state=initialState,action)=>{
  if(action.type==='userInfoUpdated')
  {
      return {...action.payload};
  }
  return state;
}
 const store = createStore(
   userInfoReducer, initialState,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );

export default store;