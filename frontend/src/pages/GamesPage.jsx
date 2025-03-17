import React from "react";
import { Link } from "react-router-dom";
import { FaBrain, FaSmile, FaSearch, FaQuestionCircle, FaBolt } from "react-icons/fa";

const games = [
  {
    title: "🧠 Fact or Fake?",
    icon: <FaBrain className="text-blue-500 text-4xl" />,
    description: "Test your ability to distinguish real news from fake ones!",
    route: "/game/fact-or-fake",
  },
  // {
  //   title: "🎭 Emoji Riddle Challenge",
  //   icon: <FaSmile className="text-yellow-500 text-4xl" />,
  //   description: "Can you guess the word, phrase, or movie from the emoji clues?",
  //   route: "/game/emoji-riddle",
  // },
  // {
  //   title: "🔍 Spot the Difference",
  //   icon: <FaSearch className="text-green-500 text-4xl" />,
  //   description: "Find 5 differences between two nearly identical images!",
  //   route: "/game/spot-the-difference",
  // },
  {
    title: "🤯 The Impossible Quiz",
    icon: <FaQuestionCircle className="text-red-500 text-4xl" />,
    description: "A tricky quiz where logic doesn't always work—expect surprises!",
    route: "/game/impossible-quiz",
  },
  // {
  //   title: "⚡ Reaction Speed Tester",
  //   icon: <FaBolt className="text-purple-500 text-4xl" />,
  //   description: "Tap as fast as possible when the light turns green!",
  //   route: "/game/reaction-speed",
  // },
];

const GamesPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-100">
        🎮 Play & Have Fun on NewsMania!
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 max-w-5xl">
        {games.map((game, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:scale-105 transition duration-300">
            <div className="mb-4">{game.icon}</div>
            <h2 className="text-xl font-bold mb-2">{game.title}</h2>
            <p className="text-gray-300 mb-4">{game.description}</p>
            <Link to={game.route} className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-lg transition">
              Play Now 🎮
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;
