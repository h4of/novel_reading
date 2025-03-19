import Home from "./pages/Home.jsx";
import List from "./pages/List.jsx";
import Author from "./pages/Author.jsx";
import Admin from "./pages/Admin.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import NovelPage from "./pages/NovelPage.jsx";
import AuthorPage from "./pages/AuthorPage.jsx";
import { Route, Routes } from "react-router-dom";
import Test from "./components/test.jsx";
import ChapterPage from "./pages/ChapterPage.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/authors" element={<Author />} />
        <Route path="/authors">
          <Route path=":authorName" element={<AuthorPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile">
          <Route path="user" element={<Profile />} />
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route path="/novel">
          <Route path=":novelName" element={<NovelPage />}></Route>
        </Route>
        <Route path="/novel">
          <Route path=":novelName">
            <Route path=":chapterNumber" element={<ChapterPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
