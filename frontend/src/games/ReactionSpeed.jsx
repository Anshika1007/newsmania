// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import Confetti from "react-confetti";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { useWindowSize } from "react-use";

// // 📰 News Headlines Data
// const headlines = [
//   { text: "Mars Rover Lands on Red Planet", level: "Easy" },
//   { text: "New AI Model Breaks Performance Records", level: "Medium" },
//   { text: "Scientists Discover Potential Cure for Cancer", level: "Hard" },
//   { text: "Stock Market Hits Record High Amid Economic Boom", level: "Hard" },
//   { text: "Global Warming Impacts Ocean Currents Significantly", level: "Medium" },
//   { text: "NASA Plans New Mission to Explore Saturn's Moons", level: "Easy" },
// ];

// // 🔀 Function to shuffle words
// const shuffleWords = (sentence) => {
//   let words = sentence.split(" ");
//   for (let i = words.length - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * (i + 1));
//     [words[i], words[j]] = [words[j], words[i]];
//   }
//   return words;
// };

// const HeadlineScramble = () => {
//   const { width, height } = useWindowSize();
//   const [index, setIndex] = useState(0);
//   const [words, setWords] = useState([]);
//   const [score, setScore] = useState(0);
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [level, setLevel] = useState(1);
//   const totalLevels = 3;

//   useEffect(() => {
//     setWords(shuffleWords(headlines[index].text));
//   }, [index]);

//   // 🎯 Handle Drag & Drop
//   const onDragEnd = (result) => {
//     if (!result.destination) return;
//     const newWords = Array.from(words);
//     const [movedItem] = newWords.splice(result.source.index, 1);
//     newWords.splice(result.destination.index, 0, movedItem);
//     setWords(newWords);
//   };

//   // ✅ Check Answer
//   const checkAnswer = () => {
//     if (JSON.stringify(words) === JSON.stringify(headlines[index].text.split(" "))) {
//       setScore(score + 1);
//       setShowConfetti(true);
//       setTimeout(() => setShowConfetti(false), 1500);
//       if ((index + 1) % 2 === 0) {
//         setLevel(Math.min(level + 1, totalLevels));
//       }
//       if (index + 1 < headlines.length) {
//         setIndex(index + 1);
//       }
//     }
//   };

//   return (
//     <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 to-gray-900 text-white">
//       {showConfetti && <Confetti width={width} height={height} />}

//       {/* 🎮 Centered Level Display */}
//       <motion.div
//         className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 px-6 py-2 rounded-lg text-xl font-bold"
//         animate={{ scale: [1, 1.2, 1] }}
//         transition={{ repeat: Infinity, duration: 2 }}
//       >
//         Level {level}/{totalLevels}
//       </motion.div>

//       {/* 🏆 Game Container */}
//       <motion.div
//         className="bg-gray-800 p-6 rounded-lg shadow-xl w-3/4 max-w-lg text-center"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.3 }}
//       >
//         <h2 className="text-2xl font-bold mb-4">📰 Unscramble the Headline!</h2>
//         <p className="text-sm text-gray-300 mb-4">
//           Drag the words into the correct order to reveal the headline.
//         </p>

//         {/* 🎲 Drag & Drop Words */}
//         <DragDropContext onDragEnd={onDragEnd}>
//           {words.length > 0 && (
//             <Droppable droppableId="words" direction="horizontal">
//               {(provided) => (
//                 <div
//                   className="flex flex-wrap justify-center space-x-2"
//                   {...provided.droppableProps}
//                   ref={provided.innerRef}
//                 >
//                   {words.map((word, i) => (
//                     <Draggable key={word + i} draggableId={word + i} index={i}>
//                       {(provided, snapshot) => (
//                         <motion.div
//                           className={`px-4 py-2 m-2 bg-blue-600 rounded-lg text-lg cursor-pointer min-w-[80px] text-center ${
//                             snapshot.isDragging ? "bg-yellow-500 shadow-lg" : "bg-blue-600"
//                           }`}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           ref={provided.innerRef}
//                           whileTap={{ scale: 1.1 }}
//                         >
//                           {word}
//                         </motion.div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           )}
//         </DragDropContext>

//         {/* 🔥 Submit Button */}
//         <motion.button
//           onClick={checkAnswer}
//           className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-700 text-white font-bold text-lg rounded-lg"
//           whileTap={{ scale: 0.9 }}
//         >
//           Submit 🚀
//         </motion.button>

//         {/* 🌟 Score */}
//         <p className="mt-4 text-lg">
//           Score: <span className="font-bold text-yellow-400">{score}</span> / {headlines.length}
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default HeadlineScramble;
