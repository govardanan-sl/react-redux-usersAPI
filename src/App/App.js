import './App.css'
import SideMenu from '../components/SideMenu/SideMenu';
import Header from '../components/Header/Header';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import PageHeader from '../components/Header/PageHeader';
import { PeopleOutlineTwoTone } from '@material-ui/icons';

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
    <ThemeProvider theme={theme}>
      <div className="App">
        <SideMenu/>
        <Header/>
        <PageHeader
          title="Page"
          subTitle="Test" icon={<PeopleOutlineTwoTone/>}/>
        <CssBaseline/>
      </div>
    </ThemeProvider>
  );
}

export default App;
