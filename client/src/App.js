import Home from './pages/Home';
import RoomDetail from './pages/RoomDetail';
import { Switch,Route, BrowserRouter } from 'react-router-dom';
import Rooms from './pages/Rooms';
import SearchRooms from './pages/SearchRooms';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/rooms"><Rooms /></Route>
        <Route exact path="/room/:roomId"><RoomDetail /></Route>
        <Route exact path="/search-rooms"><SearchRooms /></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
