import './App.css'
import SideMenu from '../components/SideMenu/SideMenu';
import Header from '../components/Header/Header';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CreateUser from '../components/CreateUser/CreateUser';

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
        <div className="App">
          <SideMenu/>
          <Header/>
          <CssBaseline/>
          <Switch>
            <Route exact path="/">
              <CreateUser/>
            </Route>
            <Route path="/users/create">
              <CreateUser/>
            </Route>
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
