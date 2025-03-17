import React, { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const newsData = [
  { text: "NASA confirms water on Mars!", isFact: true },
  { text: "Aliens landed in New York!", isFact: false },
  { text: "The Eiffel Tower grows taller in summer!", isFact: true },
  { text: "Bananas are berries, but strawberries are not!", isFact: true },
  { text: "A man in Florida legally married a pizza!", isFact: false },
  { text: "Octopuses have three hearts!", isFact: true },
  { text: "Elvis Presley is still alive!", isFact: false },
  { text: "China built a giant air purifier tower!", isFact: true },
  { text: "Bees can recognize human faces!", isFact: true },
  { text: "Cows have best friends!", isFact: true },
  { text: "A new species of fish was discovered that glows in the dark!", isFact: true },
  { text: "A cat became the mayor of a small town in Alaska!", isFact: true },
  { text: "Scientists discovered a new planet entirely made of diamonds!", isFact: false },
  { text: "A single lightning bolt is hotter than the surface of the sun!", isFact: true },
  { text: "Pineapples take two years to grow!", isFact: true },
  { text: "Wombat poop is cube-shaped!", isFact: true },
  { text: "Scientists trained goldfish to drive tiny cars!", isFact: true },
  { text: "A company is developing an invisibility cloak like in Harry Potter!", isFact: true },
  { text: "The Great Wall of China is visible from the moon!", isFact: false },
  { text: "A billionaire built a secret underground city for cats!", isFact: false },
  { text: "There’s a hotel in Sweden made entirely of ice!", isFact: true },
  { text: "A woman in Japan married a hologram!", isFact: true },
  { text: "Sharks existed before trees!", isFact: true },
  { text: "Humans share about 60% of their DNA with bananas!", isFact: true },
  { text: "There's a town in Canada where polar bears roam freely!", isFact: true },
  { text: "A man set the world record for eating 100 hot dogs in 3 minutes!", isFact: false },
  { text: "An AI-powered robot once ran for mayor in Tokyo!", isFact: true },
  { text: "Pluto was recently reclassified as a planet again!", isFact: false },
  { text: "A startup is working on a pill that lets humans breathe underwater!", isFact: false },
  { text: "An octopus can squeeze through an opening the size of its eyeball!", isFact: true },
  { text: "There's an island full of friendly foxes in Japan!", isFact: true },
  { text: "A species of jellyfish is biologically immortal!", isFact: true },
  { text: "Someone invented a real-life working lightsaber!", isFact: true },
  { text: "Birds evolved from dinosaurs!", isFact: true },
  { text: "A man in the UK built a house entirely out of Legos!", isFact: true },
  { text: "There's a secret society that controls all the WiFi in the world!", isFact: false },
  { text: "Astronauts on the ISS can grow plants in zero gravity!", isFact: true },
  { text: "Cows produce more milk when they listen to classical music!", isFact: true },
  { text: "A man once survived being struck by lightning seven times!", isFact: true },
  { text: "Scientists created an AI that can predict the future with 99% accuracy!", isFact: false },
  { text: "There's a rare pink dolphin that lives in the Amazon River!", isFact: true },
  { text: "NASA is working on a spaceship that can travel faster than light!", isFact: false },
  { text: "A town in Norway experiences months of total darkness each year!", isFact: true },
  { text: "A scientist accidentally discovered a cure for aging!", isFact: false },
  { text: "A human can survive in space without a suit for 2 minutes!", isFact: false },
  { text: "There's a type of fungus that turns ants into zombies!", isFact: true },
  { text: "Some turtles can breathe through their butts!", isFact: true },
  { text: "Pigeons can be trained to recognize famous paintings!", isFact: true },
  { text: "A monkey in India was arrested for theft!", isFact: true },
  { text: "Mars has a canyon that is 10 times longer than the Grand Canyon!", isFact: true },
  { text: "A hotel in Finland allows you to sleep under the Northern Lights!", isFact: true },
  { text: "A tree in California is over 5,000 years old!", isFact: true },
  { text: "A new species of spider was discovered that glows in the dark!", isFact: false },
  { text: "A man broke the record by sleeping for 10 days straight!", isFact: false },
  { text: "There's a cat with a world record for the loudest purr!", isFact: true },
  { text: "The Amazon rainforest produces 20% of the world's oxygen!", isFact: true },
  { text: "A scientist trained an AI to create new pizza recipes!", isFact: true },
  { text: "A man once built a jetpack using only soda bottles!", isFact: false },
  { text: "A desert in Africa is home to giant fish that swim in sand!", isFact: false },
  { text: "Penguins propose to their mates with a pebble!", isFact: true },
  { text: "The world’s smallest park is only 452 square inches!", isFact: true },
  { text: "A man lived in an airport for 18 years because of passport issues!", isFact: true },
  { text: "A new AI can translate dolphin language!", isFact: false },
  { text: "An Australian lake turns pink due to natural algae!", isFact: true },
  { text: "An underground river flows beneath the Amazon River!", isFact: true },
  { text: "A jellyfish was discovered that can live forever!", isFact: true },
  { text: "The world's largest desert is actually in Antarctica!", isFact: true },
  { text: "A chimpanzee can learn sign language to communicate with humans!", isFact: true },
  { text: "A scientist created a plant that glows like a lightbulb!", isFact: false },
  { text: "Dogs can detect cancer in humans with their sense of smell!", isFact: true },
  { text: "A man in Russia invented a gravity-defying skateboard!", isFact: false },
  { text: "A cloud once weighed as much as 100 elephants!", isFact: true },
  { text: "There’s a hotel that floats in the middle of the ocean!", isFact: true },
  { text: "The Eiffel Tower was once painted yellow!", isFact: true },
  { text: "There is a bank in Switzerland that only stores cheese!", isFact: true },
  { text: "A town in Italy banned high heels to protect ancient roads!", isFact: true },
  { text: "The Great Pyramid of Giza was originally white!", isFact: true },
  { text: "There's a festival in Spain where people throw tomatoes at each other!", isFact: true },
  { text: "A scientist discovered a black hole inside Earth's core!", isFact: false },
  { text: "A species of turtle can live without food for over a year!", isFact: true },
  { text: "NASA is planning a hotel in space by 2030!", isFact: false },
  { text: "There's a cave in Mexico full of giant crystals taller than humans!", isFact: true },
  { text: "An AI robot was granted citizenship in Saudi Arabia!", isFact: true },
  { text: "The world's largest pizza was over a mile wide!", isFact: false },
  { text: "A town in Canada has a law against turning off your headlights at night!", isFact: false },
  { text: "Scientists found a way to grow human organs inside pigs!", isFact: true },
  { text: "An octopus can taste things just by touching them!", isFact: true },
  { text: "A scientist trained bees to play soccer!", isFact: true },
  { text: "There's a fish that can walk on land!", isFact: true },
  { text: "A new species of spider was discovered that can spin webs in the shape of a smiley face!", isFact: false },
  { text: "The world's first flying car is set to launch in 2025!", isFact: true },
  { text: "A desert in Chile has gone without rain for over 500 years!", isFact: true },
  { text: "Scientists have successfully cloned a woolly mammoth!", isFact: false },
  { text: "A parrot testified in a murder trial and helped solve the case!", isFact: true },
  { text: "An island in Japan is entirely populated by bunnies!", isFact: true },
  { text: "A man in Texas built a fully functional Iron Man suit!", isFact: false },
  { text: "There's a library in Finland where you can borrow musical instruments instead of books!", isFact: true },
  { text: "Scientists discovered an exoplanet where it rains molten glass sideways!", isFact: true },
  { text: "A team of engineers created an AI that can write its own jokes!", isFact: true },
  { text: "A person once legally changed their name to 'Superman Batman Spider-Man'!", isFact: true }
];

 


const getBadge = (score, total) => {
  const percentage = (score / total) * 100;
  if (percentage >= 80) return "🏆 News Master!";
  if (percentage >= 50) return "🎖 Truth Seeker!";
  return "🤔 Better Luck Next Time!";
};

const FactOrFake = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const { width, height } = useWindowSize();
  const [isCorrect, setIsCorrect] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shake, setShake] = useState(false);

  const handleAnswer = (userChoice) => {
    const isAnswerCorrect = userChoice === newsData[index].isFact;

    if (isAnswerCorrect) {
      setScore(score + 1);
      setIsCorrect(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setIsCorrect(false);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }

    setTimeout(() => {
      setIsCorrect(null);
      const nextIndex = index + 1;
      if (nextIndex < newsData.length) {
        setIndex(nextIndex);
      } else {
        setShowResult(true);
      }
    }, 5000);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center text-white p-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      {showConfetti && <Confetti width={width} height={height} />}
      
      {!gameStarted ? (
        <motion.div
          className="text-center p-8 bg-gray-800 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-yellow-400">🧠 Fact or Fake?</h1>
          <ul className="text-lg mt-4 text-left space-y-3 list-disc list-inside">
            <li>📰 You will be given a series of news headlines.</li>
            <li>🤔 Your task is to decide if they are <strong>Fact ✅</strong> or <strong>Fake ❌</strong>.</li>
            <li>🎯 There are <strong>10 Levels</strong>, each with <strong>10 questions</strong>.</li>
            <li>📊 Answer correctly to increase your <strong>score</strong>!</li>
            <li>🏆 Try to reach <strong>Level 10</strong> and become the ultimate <span className="text-yellow-400 font-bold">News Master!</span></li>
            <li>🎉 If you get the correct answer, <strong>Confetti</strong> will celebrate your win!</li>
            <li>❌ If you get the wrong answer, the button will <strong>shake</strong> and you must wait <strong>5 seconds</strong> before the next question.</li>
          </ul>
          <button
            onClick={() => setGameStarted(true)}
            className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg transition transform hover:scale-110"
          >
            Start Game 🚀
          </button>
        </motion.div>
      ) : (
        <>
          <motion.h1
            className="text-4xl font-bold mb-6 text-center text-yellow-400"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            🧠 Fact or Fake?
          </motion.h1>

          {showResult ? (
            <motion.div
              className="text-center p-8 bg-gray-800 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold">Game Over! 🎉</h2>
              <p className="text-lg mt-2">
                Your Score: <span className="font-bold text-yellow-400">{score}</span> / {newsData.length}
              </p>
              <motion.p
                className="text-2xl mt-4 font-bold text-green-400"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                {getBadge(score, newsData.length)}
              </motion.p>
              <button
                onClick={() => {
                  setIndex(0);
                  setScore(0);
                  setShowResult(false);
                  setGameStarted(false);
                }}
                className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg transition"
              >
                Play Again 🔄
              </button>
            </motion.div>
          ) : (
            <motion.div
              className="text-center p-6 bg-gray-800 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xl font-semibold mb-4">{newsData[index].text}</p>

              <div className="space-x-4 flex">
                <motion.button
                  onClick={() => handleAnswer(true)}
                  className={`px-6 py-3 bg-green-500 hover:bg-green-700 text-white font-bold rounded-lg flex items-center gap-3 transition transform hover:scale-110 shadow-lg border-2 border-green-700 ${
                    shake && !isCorrect ? "animate-shake" : ""
                  }`}
                >
                  <FaCheckCircle className="text-white bg-green-700 rounded-full p-1 text-2xl" />
                  <span>Fact</span>
                </motion.button>

                <motion.button
                  onClick={() => handleAnswer(false)}
                  className={`px-6 py-3 bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg flex items-center gap-3 transition transform hover:scale-110 shadow-lg border-2 border-red-700 ${
                    shake && !isCorrect ? "animate-shake" : ""
                  }`}
                >
                  <FaTimesCircle className="text-white bg-red-700 rounded-full p-1 text-2xl" />
                  <span>Fake</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default FactOrFake;
