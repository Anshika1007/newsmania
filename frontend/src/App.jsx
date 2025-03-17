import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthProvider from "./contexts/AuthContext";
import Bookmarks from "./pages/Bookmarks";
import Polls from "./pages/Polls";
import GeoNews from "./pages/GeoNews";
import GamesPage from "./pages/GamesPage";
import FactOrFake from "./games/FactOrFake";
//import EmojiRiddle from "./games/EmojiRiddle";
//import SpotTheDifference from "./games/SpotTheDifference";
import ImpossibleQuiz from "./games/ImpossibleQuiz";
//import ReactionSpeed from "./games/ReactionSpeed";

const App = () => {
  const location = useLocation();

  // Check if the current page is a game page
  const isGamePage = [
    "/games",
    "/game/fact-or-fake",
    "/game/impossible-quiz",
    // "/game/emoji-riddle",
    // "/game/spot-the-difference",
    // "/game/reaction-speed"
  ].includes(location.pathname);

  return (
    <AuthProvider>
      {/* Conditional overflow */}
      <div className={`flex h-screen w-screen bg-gray-900 ${isGamePage ? "overflow-hidden" : "overflow-auto"}`}>

        {/* Sidebar Navbar (Fixed, Full Height) */}
        <div className="w-[260px] h-full bg-gray-800 shadow-lg fixed left-0 top-0">
          <Navbar />
        </div>

        {/* Main Content (Fills Remaining Space) */}
        <div className="flex-1 min-h-screen bg-gray-900 text-white p-6 ml-[260px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/polls" element={<Polls />} />
            <Route path="/geo-news" element={<GeoNews />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/game/fact-or-fake" element={<FactOrFake />} />
            {/* <Route path="/game/emoji-riddle" element={<EmojiRiddle />} />
            <Route path="/game/spot-the-difference" element={<SpotTheDifference />} /> */}
            <Route path="/game/impossible-quiz" element={<ImpossibleQuiz />} />
            {/* <Route path="/game/reaction-speed" element={<ReactionSpeed />} /> */}
          </Routes>
        </div>

      </div>
    </AuthProvider>
  );
};

export default App;
