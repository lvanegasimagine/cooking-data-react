import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Page Components
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Search from './pages/search/Search';
import Recipe from './pages/recipe/Recipe';

// Styles
import './App.css'
import Navbar from './components/navbar/Navbar';
import ThemeSelector from './Theme/ThemeSelector';
import { useTheme } from './hooks/useTheme';

function App() {

  const { mode } = useTheme();

  return (
    <div className={`App ${mode}`}>
      <Router>
      <Navbar/>
      <ThemeSelector/>
        <Switch>
            <Route exact path='/'> <Home/> </Route>
            <Route exact path='/create'> <Create/> </Route>
            <Route exact path='/search'> <Search/> </Route>
            <Route exact path='/recipes/:id'> <Recipe/> </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App
