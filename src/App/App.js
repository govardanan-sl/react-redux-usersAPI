import './App.css'
import SideMenu from '../components/SideMenu/SideMenu';
import Header from '../components/Header/Header';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CreateUser from '../components/CreateUser/CreateUser';
import DisplayUsers from '../components/DisplayUsers/DisplayUsers';
import Login from '../components/Login/Login';
import { Provider } from 'react-redux';
import { persistor, store } from '../Store/store';
import { PersistGate } from 'redux-persist/integration/react';

const theme = createMuiTheme({
  palette:{
    main:"#333996",
    light:"#3c44b126"
  },
  secondary:{
    main:"#f83245",
    light:"#f8324526"
  }
})


function App() {
  return (
    <Router>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <SideMenu/>
          <Header/>
          <CssBaseline/>
          <Switch>
            <Route exact path="/">
              <DisplayUsers/>
            </Route>
            <Route path="/users/create">
              <CreateUser/>
            </Route>
            <Route path="/users/view">
              <DisplayUsers/>
            </Route>
          </Switch>
        </div>
        </PersistGate>
      </Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
