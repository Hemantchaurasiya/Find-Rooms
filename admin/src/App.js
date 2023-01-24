import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import CreateRoom from "./pages/CreateRoom";
import UpdateRoom from "./pages/UpdateRoom";
import Home from "./pages/Home";
import RoomDetail from "./pages/RoomDetail";
import SearchRooms from "./pages/SearchRooms";
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from './store/authSlice';
import { Switch, Link, Route, BrowserRouter } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const updateUserState = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(setAuth({ user: user.userData }));
    }
    return (<Login />);
  }
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    updateUserState();
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/register"> <Register /> </Route>
        <Route exact path="/login"> <Login /> </Route>
        <Route exact path="/"> <Home /> </Route>
        <Route exact path="/create-room"> <CreateRoom /> </Route>
        <Route exact path="/room/:roomId"><RoomDetail /></Route>
        <Route exact path="/update-room/:roomId"> <UpdateRoom /> </Route>
        <Route exact path="/search-rooms"><SearchRooms /></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
