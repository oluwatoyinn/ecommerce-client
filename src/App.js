import React from 'react'
import store from './store'
import {Provider} from 'react-redux'
import {Route, Switch,} from 'react-router-dom'
// import './App.css';
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import AuthenticateAppBar from "./views/AuthenticateAppBar";
import UnauthenticatedUser from "./views/UnauthenticatedUser";
import Products from './components/Home/Products'
import ProductCategories from './components/Home/ProductCategories'
import setAuthenticatedToken from "./utils/SetAuthenticatedToken"
import PrivateRoute from "./routing/PrivateRoute";
import { LOGIN } from "./actions/type";
import Register from "./authentications/Register";
// import Alert from './components/Alert'

// import HomeBar from './components/Home/NavBar'

const accessToken = localStorage.jwt_token
if(accessToken){
    setAuthenticatedToken(accessToken)
    store.dispatch({
      type: LOGIN,
      payload: accessToken
    })
}


function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <ReduxToastr
          position="top-center"
          transitionIn='bounceIn'
          transitionOut='bounceOut'
          progressBar
          preventDuplicates
        />
        {/* <section className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <Alert/>
            </div>
          </div>
        </section> */}
        <Switch>
            <Route exact path="/" component={UnauthenticatedUser} />
            <PrivateRoute path="/home" component={AuthenticateAppBar} />
            <PrivateRoute path="/product" component={Products} />
            <PrivateRoute path="/category" component={ProductCategories} />
            <Route path="/register" component={Register}/>
        </Switch>
      </Provider>
    </React.Fragment>
  );
}
export default App;
