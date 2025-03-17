// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// // 🎭 Emoji Riddles List
// const emojiRiddles = [
//   { emoji: "🔥📖", answer: "Fire Story" },
//   { emoji: "🦷🚿", answer: "Toothpaste" },
//   { emoji: "🏠🔑", answer: "House Key" },
//   { emoji: "⚡️🐁", answer: "Electric Mouse" },
//   { emoji: "🐟🍟", answer: "Fish and Chips" },
//   { emoji: "🕷️🧑", answer: "Spider Man" },
//   { emoji: "🍎📱", answer: "Apple Phone" },
//   { emoji: "🚗💨", answer: "Fast Car" },
//   { emoji: "🎩🐰", answer: "Magic Trick" },
//   { emoji: "🌎🔚", answer: "World End" },
// ];

// const riddlesPerLevel = 10;
// const totalLevels = 10;
// const livesPerLevel = 3;
// const passingScore = 7; // 🎯 Must score 7 to pass the level

// const EmojiRiddle = () => {
//   const [showInstructions, setShowInstructions] = useState(true);
//   const [index, setIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [level, setLevel] = useState(1);
//   const [lives, setLives] = useState(livesPerLevel);
//   const [userInput, setUserInput] = useState("");
//   const [wrongAnswers, setWrongAnswers] = useState([]);
//   const [showLevelSummary, setShowLevelSummary] = useState(false);
//   const [shake, setShake] = useState(false);

//   useEffect(() => {
//     if (lives <= 0) {
//       setShowLevelSummary(true);
//     }
//   }, [lives]);

//   const handleSubmit = () => {
//     const correctAnswer = emojiRiddles[index].answer.toLowerCase();
//     if (userInput.toLowerCase() === correctAnswer) {
//       setScore(score + 1);
//     } else {
//       setLives(lives - 1);
//       setWrongAnswers([...wrongAnswers, { emoji: emojiRiddles[index].emoji, correct: correctAnswer }]);
//       setShake(true);
//       setTimeout(() => setShake(false), 500);
//     }

//     setUserInput("");

//     if ((index + 1) % riddlesPerLevel === 0) {
//       setShowLevelSummary(true);
//     } else {
//       setIndex(index + 1);
//     }
//   };

//   const handleNextLevel = () => {
//     if (score >= passingScore) {
//       setLevel(level + 1);
//       setIndex(level * riddlesPerLevel);
//     } else {
//       setIndex((level - 1) * riddlesPerLevel);
//     }

//     setScore(0);
//     setLives(livesPerLevel);
//     setWrongAnswers([]);
//     setShowLevelSummary(false);
//   };

//   return (
//     <div className="w-screen h-screen flex flex-col justify-center items-center text-white bg-gradient-to-br from-black to-gray-900">
//       {/* 📜 Instructions */}
//       {showInstructions && (
//         <motion.div
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 text-white"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="bg-gray-900 text-center p-8 rounded-lg shadow-2xl border-2 border-gray-700 w-[90%] max-w-xl mx-auto">
//             <h1 className="text-4xl font-bold mb-6 text-yellow-400">📜 How to Play</h1>
//             <ul className="text-lg space-y-4 text-left">
//               <li>🔥 Solve <strong>10 emoji riddles</strong> per level.</li>
//               <li>❤️ You have <strong>3 lives</strong> per level.</li>
//               <li>🚀 If lives reach <strong>0</strong>, restart from the last cleared level.</li>
//               <li>🎯 Answer correctly to move forward!</li>
//               <li>❌ Wrong answers shake the input box.</li>
//               <li>💡 If you answer wrong, the correct answer will be revealed at the end of the level.</li>
//             </ul>
//             <button
//               onClick={() => setShowInstructions(false)}
//               className="mt-6 px-6 py-3 bg-yellow-600 hover:bg-yellow-800 text-white font-bold text-lg rounded-full transition transform scale-105 hover:scale-110"
//             >
//               Start Game 🚀
//             </button>
//           </div>
//         </motion.div>
//       )}

//       {/* 🏆 Progress Bar */}
//       <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-3/5 bg-gray-700 rounded-full overflow-hidden">
//         <div
//           className="h-5 bg-yellow-400 transition-all"
//           style={{ width: `${(score / riddlesPerLevel) * 100}%` }}
//         ></div>
//       </div>

//       {/* 🎯 Score Display */}
//       <div className="absolute top-5 right-5 text-2xl bg-gray-900 bg-opacity-70 px-6 py-2 rounded-xl font-bold">
//         Score: {score}
//       </div>

//       {/* 🎉 Level Summary */}
//       {showLevelSummary && (
//         <motion.div
//           className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-80 text-center p-6 rounded-lg shadow-2xl w-4/5 max-w-2xl"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           <h2 className="text-4xl font-bold text-yellow-400 animate-bounce">🎉 Level {level} Complete!</h2>
//           <h3 className="text-2xl mt-4">Wrong Answers:</h3>
//           {wrongAnswers.length > 0 ? (
//             <ul className="mt-2 text-lg">
//               {wrongAnswers.map((item, idx) => (
//                 <li key={idx}>
//                   {item.emoji} → <span className="text-green-400">{item.correct}</span>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="mt-2 text-green-400">Perfect Score! 🎯</p>
//           )}
//           <button
//             onClick={handleNextLevel}
//             className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-800 text-white font-bold text-lg rounded-full transition-all"
//           >
//             {score >= passingScore ? "Next Level 🚀" : "Retry Level 🔄"}
//           </button>
//         </motion.div>
//       )}

//       {/* 🕹️ Game UI */}
//       {!showLevelSummary && !showInstructions && (
//         <motion.div
//           className="text-center p-6 bg-gray-800 bg-opacity-90 rounded-lg shadow-2xl w-4/5 max-w-xl"
//         >
//           <p className="text-4xl font-bold mb-6">{emojiRiddles[index].emoji}</p>
//           <motion.input
//             type="text"
//             className={`w-full p-3 text-lg text-black rounded-lg border-none focus:ring-2 focus:ring-yellow-400 outline-none ${shake ? "shake" : ""}`}
//             placeholder="Your Answer..."
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//           />
//           <button
//             onClick={handleSubmit}
//             className="mt-4 px-6 py-3 bg-yellow-600 hover:bg-yellow-800 text-white font-bold text-lg rounded-full transition-all"
//           >
//             Submit 🚀
//           </button>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default EmojiRiddle;
