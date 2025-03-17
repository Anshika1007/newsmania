import React, { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import useSound from "use-sound";
import wrongSfx from "../assets/wrong-47985.mp3"; // Add a wrong answer sound
import correctSfx from "../assets/correct-6033.mp3"; // Add a correct answer sound
import clickSfx from "../assets//level-up-47165.mp3"; // Click sound
import { useWindowSize } from "react-use";


// 🎭 The Ultimate Trick Question Challenge! (100 Questions)
const questions = [
  { question: "What is 2 + 2?", options: ["4", "22", "Fish", "Window"], correct: "Fish" },
  { question: "Which is heavier, 1 kg of feathers or 1 kg of steel?", options: ["Steel", "Feathers", "Both are equal", "Gravity decides"], correct: "Both are equal" },
  { question: "How many months have 28 days?", options: ["1", "2", "12", "Depends on the year"], correct: "12" },
  { question: "What comes after Tuesday?", options: ["Wednesday", "Friday", "Tomorrow", "Next Question"], correct: "Next Question" },
  { question: "What color is an orange?", options: ["Orange", "Green", "Depends on ripeness", "Blue"], correct: "Depends on ripeness" },
  { question: "Which is faster, light or sound?", options: ["Light", "Sound", "Depends on location", "Cheetah"], correct: "Depends on location" },
  { question: "If a plane crashes on the border of two countries, where are the survivors buried?", options: ["Country A", "Country B", "Nowhere", "At sea"], correct: "Nowhere" },
  { question: "What has hands but can’t clap?", options: ["A monkey", "A statue", "A clock", "A T-Rex"], correct: "A clock" },
  { question: "If you pass the person in second place in a race, what place are you in?", options: ["First", "Second", "Third", "Last"], correct: "Second" },
  { question: "How many legs does a spider have?", options: ["6", "8", "10", "Depends on the spider"], correct: "8" },
  { question: "Which animal lays the largest eggs?", options: ["Snake", "Crocodile", "Ostrich", "Dinosaur"], correct: "Dinosaur" },
  { question: "What goes up but never comes down?", options: ["Age", "Balloon", "Rocket", "Bird"], correct: "Age" },
  { question: "Can you cry underwater?", options: ["Yes", "No", "Depends on the water", "Only in space"], correct: "Yes" },
  { question: "What is always in front of you but can’t be seen?", options: ["The past", "The future", "Your breath", "Air"], correct: "The future" },
  { question: "What can you catch but not throw?", options: ["A cold", "A ball", "A butterfly", "A fish"], correct: "A cold" },
  { question: "What has a head and a tail but no body?", options: ["Snake", "Coin", "Lizard", "Comet"], correct: "Coin" },
  { question: "A rooster lays an egg on top of a roof. Which way does it roll?", options: ["Left", "Right", "Down", "Roosters don’t lay eggs"], correct: "Roosters don’t lay eggs" },
  { question: "How many letters are in ‘the alphabet’?", options: ["11", "12", "26", "24"], correct: "11" },
  { question: "If an electric train is traveling south, which way is the smoke going?", options: ["North", "South", "Up", "No smoke"], correct: "No smoke " },
  { question: "What is full of holes but still holds water?", options: ["Bucket", "Sponge", "Pipe", "Cloud"], correct: "Sponge" },
  { question: "What starts with ‘e’, ends with ‘e’, and has one letter in it?", options: ["Envelope", "Eerie", "Eye", "Eagle"], correct: "Envelope" },
  { question: "What is light as a feather, yet the strongest man can’t hold it for long?", options: ["Feather", "Breath", "Cloud", "Shadow"], correct: "Breath" },
  { question: "What has a face but can’t smile?", options: ["A clock", "A mirror", "A mask", "A painting"], correct: "A clock" },
  { question: "What kind of room has no doors or windows?", options: ["A hotel room", "A mushroom", "A dark room", "A virtual room"], correct: "A mushroom" },
  { question: "Where does today come before yesterday?", options: ["Nowhere", "Dictionary", "Time travel", "History books"], correct: "Dictionary" },
  { question: "If two’s company and three’s a crowd, what are four and five?", options: ["Nine", "Party", "Confusion", "Numbers"], correct: "Nine" },
  { question: "What has one eye but can’t see?", options: ["A needle", "A blindfold", "A storm", "A worm"], correct: "A needle" },
  { question: "What gets wetter as it dries?", options: ["A towel", "Water", "A sponge", "Rain"], correct: "A towel" },
  { question: "Which word is spelled incorrectly in every dictionary?", options: ["Incorrectly", "Dictionary", "Spelling", "Error"], correct: "Incorrectly" },
  { question: "How can a man go eight days without sleep?", options: ["He sleeps at night", "He is a robot", "He is a vampire", "Magic"], correct: "He sleeps at night" },
  { question: "If you have three apples and take away two, how many do you have?", options: ["1", "2", "3", "0"], correct: "2 " },
  { question: "Which weighs more, a ton of bricks or a ton of feathers?", options: ["Bricks", "Feathers", "They weigh the same", "Depends on humidity"], correct: "They weigh the same" },
  { question: "How do you make the number one disappear?", options: ["Add 9", "Erase it", "Put a ‘G’ in front", "It's impossible"], correct: "Put a ‘G’ in front )" },
  { question: "What has keys but opens no locks?", options: ["Piano", "Computer", "Treasure chest", "Safe"], correct: "Piano" },
  { question: "What comes down but never goes up?", options: ["Rain", "Sunlight", "Time", "Gravity"], correct: "Rain" },
  { question: "What do you call a bear with no teeth?", options: ["Panda", "Grizzly", "Gummy bear", "Teddy"], correct: "Gummy bear" },
  { question: "What can you break but never hold?", options: ["Glass", "A promise", "A heart", "A rule"], correct: "A promise" },
  { question: "Which is correct: 'The yolk of the egg IS white' or 'The yolk of the egg ARE white'?", options: ["First one", "Second one", "Neither", "Both"], correct: "Neither " },
  { question: "What comes at the end of everything?", options: ["The end", "Time", "Letter G", "Nothing"], correct: "Letter G" },
  { question: "How many sides does a circle have?", options: ["None", "One", "Two", "Infinite"], correct: "Two" },
  { question: "What goes up but never down?", options: ["Age", "Smoke", "Temperature", "Rocket"], correct: "Age" },
  { question: "What runs but never walks?", options: ["Water", "Clock", "Man", "Cheetah"], correct: "Water" },
  { question: "What has a neck but no head?", options: ["Bottle", "Giraffe", "Snake", "Shirt"], correct: "Bottle" },
  { question: "If a red house is made of red bricks, a blue house is made of blue bricks, what is a greenhouse made of?", options: ["Green bricks", "Glass", "Leaves", "Plastic"], correct: "Glass" },
  { question: "The more of this you take, the more you leave behind. What is it?", options: ["Time", "Steps", "Memories", "Dust"], correct: "Steps" },
  { question: "What has many keys but can't open a single lock?", options: ["Piano", "Keyboard", "Safe", "Map"], correct: "Piano" },
  { question: "What can you hold in your right hand but never in your left?", options: ["Your left hand", "A mirror", "A shadow", "A secret"], correct: "Your left hand" },
  { question: "What has cities but no houses, forests but no trees, and rivers but no water?", options: ["A book", "A map", "A puzzle", "A game"], correct: "A map" },
  { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", options: ["Letter 'M'", "Time", "A miracle", "A heartbeat"], correct: "Letter 'M'" },
  { question: "You see a boat filled with people. It hasn’t sunk, but when you look again you don’t see a single person. Why?", options: ["They are hiding", "They are married", "It vanished", "Magic"], correct: "They are married" },
  { question: "A man rode into town on Friday and left two days later on Friday. How?", options: ["Time travel", "Different calendar", "Friday is a horse", "Magic"], correct: "Friday is a horse" },
  { question: "What is so fragile that saying its name breaks it?", options: ["Glass", "Silence", "A promise", "A heart"], correct: "Silence" },
  { question: "A cowboy rides into town on Sunday, stays three days, and leaves on Sunday. How?", options: ["Time travel", "Sunday is a horse", "He forgot", "A mistake"], correct: "Sunday is a horse" },
  { question: "If you throw a blue stone into the Red Sea, what will it become?", options: ["Red", "Blue", "Wet", "Lost"], correct: "Wet" },
  { question: "Which word is spelled the same forward, backward, and upside down?", options: ["Noon", "Racecar", "Mom", "Swims"], correct: "Swims" },
  { question: "If a rooster lays an egg at the top of a hill, which way does it roll?", options: ["Left", "Right", "Down", "Roosters don’t lay eggs"], correct: "Roosters don’t lay eggs" },
  { question: "What has a thumb and four fingers but isn’t alive?", options: ["A hand", "A clock", "A glove", "A painting"], correct: "A glove" },
  { question: "A girl fell off a 50-foot ladder but didn’t get hurt. How?", options: ["She landed on a net", "She fell from the bottom step", "She had wings", "She had a parachute"], correct: "She fell from the bottom step" },
  { question: "If you have me, you want to share me. If you share me, you no longer have me. What am I?", options: ["A secret", "A promise", "Love", "A shadow"], correct: "A secret" },
  { question: "The more you take, the more you leave behind. What am I?", options: ["Memories", "Footsteps", "Time", "Dreams"], correct: "Footsteps" },
  { question: "What is always coming but never arrives?", options: ["Tomorrow", "The bus", "A promise", "A letter"], correct: "Tomorrow" },
  { question: "I start with ‘T’, end with ‘T’, and have ‘T’ in me. What am I?", options: ["Teapot", "Tent", "Toast", "Tablet"], correct: "Teapot" },
  { question: "What can be cracked, made, told, and played?", options: ["A joke", "A code", "A puzzle", "A story"], correct: "A joke" },
  { question: "I have hands but cannot clap. What am I?", options: ["A clock", "A statue", "A painting", "A robot"], correct: "A clock" },
  { question: "If there are 6 apples and you take away 4, how many do you have?", options: ["2", "4", "6", "0"], correct: "4 " },
  { question: "What is the capital of France?", options: ["Paris", "F", "London", "Europe"], correct: "F " },
  { question: "What has teeth but cannot bite?", options: ["A comb", "A saw", "A zipper", "A gear"], correct: "A comb" },
  { question: "What has one head, one foot, and four legs?", options: ["A chair", "A table", "A bed", "A human"], correct: "A bed" },
  { question: "If two’s company and three’s a crowd, what are four and five?", options: ["Nine", "Ten", "Party", "Chaos"], correct: "Nine" },
  { question: "Which letter of the alphabet has the most water?", options: ["C", "O", "S", "W"], correct: "C " },
  { question: "What has a bottom at the top?", options: ["A hill", "A chair", "A human", "A mountain"], correct: "A human" },
  { question: "What belongs to you but is used more by others?", options: ["Your phone", "Your name", "Your time", "Your shadow"], correct: "Your name" },
  { question: "What has ears but cannot hear?", options: ["A book", "A cornfield", "A rabbit", "A pillow"], correct: "A cornfield" },
  { question: "If 5 cats catch 5 mice in 5 minutes, how long does it take 100 cats to catch 100 mice?", options: ["5 minutes", "100 minutes", "50 minutes", "10 minutes"], correct: "5 minutes" },
  { question: "What has words but never speaks?", options: ["A book", "A letter", "A sign", "A ghost"], correct: "A book" },
  { question: "What gets sharper the more you use it?", options: ["A knife", "Your mind", "A pencil", "A saw"], correct: "Your mind" },
  { question: "What has an end but no beginning?", options: ["A ring", "A road", "A rainbow", "A stick"], correct: "A stick" },
  { question: "What has hands but no arms?", options: ["A clock", "A doll", "A robot", "A statue"], correct: "A clock" },
  { question: "What is full of holes but still holds water?", options: ["A sponge", "A net", "A bucket", "A balloon"], correct: "A sponge" },
  { question: "What has four eyes but can’t see?", options: ["A bat", "A fish", "Mississippi", "An owl"], correct: "Mississippi" },
  { question: "What comes at night without being called and is lost in the day without being stolen?", options: ["Stars", "The moon", "A dream", "A shadow"], correct: "A shadow" },
  { question: "What is always in front of you but can’t be seen?", options: ["Your future", "The wind", "A mirror", "Your thoughts"], correct: "Your future" },
  { question: "If you spell ‘sit in the tub’ backwards, what do you get?", options: ["A sentence", "Confusion", "The same thing", "A bath"], correct: "A bath" },
  { question: "What has 13 hearts but no other organs?", options: ["A ghost", "A deck of cards", "A book", "A calendar"], correct: "A deck of cards" },
  { question: "What can you catch but not throw?", options: ["A cold", "A shadow", "A ball", "A word"], correct: "A cold" },
  { question: "What has roots but never grows?", options: ["A tree", "A riddle", "A mountain", "A mushroom"], correct: "A mountain" },
  { question: "What kind of room has no doors or windows?", options: ["A dark room", "A fun room", "A mushroom", "A vacuum"], correct: "A mushroom" },
  { question: "What kind of coat is always wet when you put it on?", options: ["A fur coat", "A raincoat", "A paint coat", "A winter coat"], correct: "A paint coat" },
  { question: "The more you take, the bigger I get. What am I?", options: ["A balloon", "A footprint", "A river", "A hole"], correct: "A hole" },
  { question: "What is lighter than air but even the strongest person can’t hold it for long?", options: ["A cloud", "A balloon", "Breath", "A secret"], correct: "Breath" },
  { question: "The person who makes it, sells it. The person who buys it never uses it. The person who uses it never knows. What is it?", options: ["A coffin", "A gift", "A clock", "A ticket"], correct: "A coffin" },
  { question: "What has a head, a tail, but no body?", options: ["A coin", "A snake", "A worm", "A pencil"], correct: "A coin" },
  { question: "What is harder to catch the faster you run?", options: ["Your breath", "A rabbit", "A cheetah", "A car"], correct: "Your breath" },
  { question: "The more you remove from me, the bigger I get. What am I?", options: ["A pit", "A cave", "A hole", "A memory"], correct: "A hole" },
  { question: "What has a mouth but never eats, a bed but never sleeps?", options: ["A river", "A volcano", "A fire", "A cave"], correct: "A river" },
  { question: "What disappears as soon as you say its name?", options: ["Darkness", "Silence", "A secret", "A ghost"], correct: "Silence" },
  { question: "What travels around the world but stays in the same place?", options: ["A stamp", "A shadow", "A compass", "A satellite"], correct: "A stamp" },
  { question: "What breaks but never falls, and what falls but never breaks?", options: ["A heart and a soul", "A wave and a tear", "Day and night", "A promise and trust"], correct: "Day and night" },
  { question: "What can you hold without touching?", options: ["A dream", "Your breath", "A thought", "A conversation"], correct: "Your breath" },
  { question: "What has 88 keys but can’t open a single door?", options: ["A piano", "A keyboard", "A safe", "A music box"], correct: "A piano" },
 
];

console.log(questions.length);


// 🕹️ Game Component
const ImpossibleQuiz = () => {
  const { width, height } = useWindowSize();
  const questionsPerLevel = 10;
  const totalLevels = Math.ceil(questions.length / questionsPerLevel);

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [checkpoint, setCheckpoint] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLevelConfetti, setShowLevelConfetti] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const [playWrong] = useSound(wrongSfx);
  const [playCorrect] = useSound(correctSfx);
  const [playClick] = useSound(clickSfx);

  const currentQuestion = questions[index];
  const levelProgress = (((index % questionsPerLevel) + 1) / questionsPerLevel) * 100;

  const handleAnswer = (answer) => {
    playClick();
    if (gameOver) return;

    if (answer === currentQuestion.correct) {
      playCorrect();
      setScore(score + 1);
      setWrongAttempts(0);
      setShowCorrect(false);
      nextQuestion();
    } else {
      playWrong();
      setWrongAttempts(wrongAttempts + 1);

      if (wrongAttempts + 1 >= 3) {
        setShowCorrect(true);
        setTimeout(nextQuestion, 2000);
      }

      setLives(lives - 1);
      if (lives - 1 === 0) handleCheckpointRestart();
    }
  };

  const nextQuestion = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setShowCorrect(false);
      setWrongAttempts(0);

      if ((index + 1) % questionsPerLevel === 0) {
        setLevel(level + 1);
        setCheckpoint(level + 1);
        triggerLevelConfetti();
        setLives(3);
      }
    } else {
      setShowConfetti(true);
      setGameOver(true);
    }
  };

  const handleCheckpointRestart = () => {
    setLives(3);
    setWrongAttempts(0);
    setShowCorrect(false);
    setIndex((checkpoint - 1) * questionsPerLevel);
  };

  const triggerLevelConfetti = () => {
    setShowLevelConfetti(true);
    setTimeout(() => setShowLevelConfetti(false), 2000);
  };

  const restartGame = () => {
    setIndex(0);
    setScore(0);
    setLives(3);
    setLevel(1);
    setCheckpoint(1);
    setGameOver(false);
    setShowConfetti(false);
    setShowLevelConfetti(false);
    setWrongAttempts(0);
    setShowCorrect(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 relative">
      {showConfetti && <Confetti width={width} height={height} />}
      {showLevelConfetti && <Confetti width={width} height={height} numberOfPieces={200} />}

      {/* 🏆 Header */}
      <motion.h1 className="text-4xl font-bold mb-4 text-yellow-400">
        🤯 The Impossible Quiz
      </motion.h1>

      {/* 📜 How to Play Modal */}
      {showInstructions && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-3/4 max-w-lg">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">📜 How to Play</h2>
            <ul className="text-lg text-left space-y-2">
              <li>🔹 You get **3 lives** per level.</li>
              <li>🔹 Answer **10 tricky questions** to pass a level.</li>
              <li>🔹 If you lose all lives, you restart from the **last level**.</li>
              <li>🔹 Get an answer wrong **3 times**, and the correct one is shown.</li>
              <li>🔹 Beat all levels to **win the game!** 🎉</li>
            </ul>
            <motion.button
              onClick={() => setShowInstructions(false)}
              className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded-lg"
            >
              🚀 Start Game
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* 🏁 Game Over Screen */}
      {gameOver ? (
        <motion.div className="bg-red-700 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">
            {score === questions.length ? "🎉 You Did the Impossible!" : "💀 Game Over!"}
          </h2>
          <p className="text-lg mb-4">Final Score: {score}/{questions.length}</p>
          <motion.button
            onClick={restartGame}
            className="px-6 py-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded-lg"
          >
            🔄 Play Again
          </motion.button>
        </motion.div>
      ) : (
        <>
          {/* 🎭 Question Box */}
          <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg w-3/4 max-w-lg text-center">
            <h2 className="text-xl font-bold mb-4">{currentQuestion.question}</h2>
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option, i) => (
                <motion.button
                  key={i}
                  className={`px-4 py-2 font-bold rounded-lg ${
                    showCorrect && option === currentQuestion.correct ? "bg-green-600" : "bg-blue-600"
                  } hover:bg-blue-800 text-white`}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </motion.button>
              ))}
            </div>
            {showCorrect && <p className="mt-4 text-green-400 font-bold">✅ Correct Answer: {currentQuestion.correct}</p>}
          </motion.div>

          {/* Progress Bar & Lives */}
          <div className="mt-4 text-lg w-3/4 max-w-lg">
            <p>🏆 Score: <b>{score}</b> | ❤️ Lives: <b>{lives}</b> | 📍 Level {level}/{totalLevels}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ImpossibleQuiz;