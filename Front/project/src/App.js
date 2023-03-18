import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./Pages/HomePage";
import UsersPage from "./Pages/UsersPage";
import AdminHome from "./Pages/AdminHome";
import GameList from "./Components/GameList";
import AdminHomePage from "./Components/AdminHomePage";
import UserList from "./Components/UserList";
import UserInfo from "./Pages/UserInfo";
import { getAllGames, getAllUser, adminPass } from "./api";

function App() {
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  const [pass, setPass] = useState("");
  const loadUser = async () => {
    const data = await getAllUser();
    setUsers(data.data);
  };

  const getAll = async () => {
    const gamesLoad = await getAllGames();
    if (gamesLoad.ok) {
      setGames(gamesLoad.data);
    }
  };
  const getPass = async () => {
    const passload = await adminPass();
    if (passload.ok) {
      setPass(passload.data.password);
    }
  };
  useEffect(() => {
    loadUser();
    getAll();
    getPass();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage gameList={games} getAll={getAll} />}
      ></Route>
      <Route
        path="/:userid"
        element={<HomePage user gameList={games} getAll={getAll} />}
      ></Route>
      <Route path="/:userid/info" element={<UserInfo loadUser={loadUser} />} />
      <Route
        path="/login"
        element={<UsersPage users={users} loadUser={loadUser} pass={pass} />}
      />
      <Route path="/admin" element={<AdminHome />}>
        <Route
          path=""
          element={
            <AdminHomePage users={users} games={games} getPass={getPass} />
          }
        />
        <Route
          path="/admin/game"
          element={<GameList admin gameList={games} getAll={getAll} />}
        ></Route>
        <Route
          path="/admin/user"
          element={<UserList admin users={users} loadUser={loadUser} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
