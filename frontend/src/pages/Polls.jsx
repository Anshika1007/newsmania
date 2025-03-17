import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import API_ENDPOINTS from "../api";
import { FaPoll, FaFire, FaClock, FaCheckCircle } from "react-icons/fa";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ChartDataLabels);

ChartJS.register(ArcElement, Tooltip, Legend);

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30 * 60 * 1000);
  const [votedPolls, setVotedPolls] = useState({});

  useEffect(() => {
    fetchPolls();
    const pollInterval = setInterval(fetchPolls, 30 * 60 * 1000);
    return () => clearInterval(pollInterval);
  }, []);

  const fetchPolls = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.POLLS);
      const { polls, nextPollTime } = response.data;
      setPolls(polls || []);
      localStorage.setItem("nextPollTime", nextPollTime);
      updateCountdown(nextPollTime);
    } catch (error) {
      console.error("❌ Error fetching polls:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleVote = async (pollId, optionIndex) => {
    try {
      const response = await axios.patch(API_ENDPOINTS.VOTE_POLL, { pollId, optionIndex });
  
      setPolls((prevPolls) =>
        prevPolls.map((poll) => {
          if (poll._id === pollId) {
            // Get previous vote index
            const previousVoteIndex = votedPolls[pollId];
  
            // Clone votes array to modify
            const updatedVotes = [...poll.votes];
  
            if (previousVoteIndex !== undefined) {
              // Decrease previous vote count
              updatedVotes[previousVoteIndex] -= 1;
            }
  
            // Increase new vote count
            updatedVotes[optionIndex] += 1;
  
            return { ...poll, votes: updatedVotes };
          }
          return poll;
        })
      );
  
      // Save the user's new vote
      setVotedPolls((prev) => ({ ...prev, [pollId]: optionIndex }));
    } catch (error) {
      console.error("❌ Error voting:", error);
    }
  };
  

  const updateCountdown = (nextPollTimestamp) => {
    const remainingTime = nextPollTimestamp - Date.now();
    setTimeLeft(Math.max(remainingTime, 0));
  };

  useEffect(() => {
    const savedNextPollTime = localStorage.getItem("nextPollTime");
    if (savedNextPollTime) updateCountdown(parseInt(savedNextPollTime, 10));
    else fetchPolls();

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          fetchPolls();
          return 30 * 60 * 1000;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const formatTime = (ms) => {
    const minutes = String(Math.floor((ms / 1000 / 60) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((ms / 1000) % 60)).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6  text-white rounded-lg shadow-lg border ">
      <h2 className="text-3xl font-bold text-center mb-6 text-red-700 flex items-center justify-center">
        <FaPoll className="mr-2 text-red-800" /> Trending Polls
      </h2>

      <div className="text-center text-black mb-4 text-lg font-semibold flex justify-center items-center space-x-2">
        <FaClock className="text-red-800 animate-pulse" />
        <span className="text-gray-700">Next Poll in:</span>
        <span className="text-red-700 font-bold text-xl">{formatTime(timeLeft)}</span>
      </div>

      {loading ? (
        <motion.p
          className="text-center text-gray-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading polls...
        </motion.p>
      ) : polls.length === 0 ? (
        <motion.p
          className="text-center text-gray-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No active polls. Check back later!
        </motion.p>
      ) : (
        polls.map((poll) => {
          const totalVotes = poll.votes.reduce((acc, curr) => acc + curr, 0) || 1;
          const colors = ["#ff4d4d", "#ffcc00", "#00cc66", "#3399ff"];
          const hoverColors = ["#ff6666", "#ffdb4d", "#00e673", "#66b3ff"];

          return (
            <motion.div
              key={poll._id}
              className="bg-gray-800 p-6 rounded-lg mb-6 shadow-lg border border-red-500 flex flex-col md:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
             {/* Poll Question & Options */}
              <div className="w-full md:w-2/3 pr-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  {poll.question} {poll.votes.reduce((a, b) => a + b, 0) > 50 && <FaFire className="ml-2 text-red-500 animate-pulse" />}
                </h3>
                <div className="mt-4 space-y-3">
                  {poll.options.map((option, index) => {
                    const percentage = ((poll.votes?.[index] ?? 0) / totalVotes * 100).toFixed(1);
                    const isVoted = votedPolls[poll._id] === index;

                    return (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleVote(poll._id, index)}
                        className={`w-full flex items-center justify-between p-3 rounded-md transition-all duration-300 ${
                          isVoted
                            ? "bg-gradient-to-r from-green-600 to-green-500"
                            : "bg-gradient-to-r from-gray-700 to-gray-600 hover:from-red-500 hover:to-red-600"
                        } text-white`}
                      >
                        <span>{option}</span>
                        <span className="flex items-center text-gray-300">
                          {isVoted && <FaCheckCircle className="text-green-400 mr-2" />}
                          {poll.votes?.[index] ?? 0} votes ({percentage}%)
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
 {/* Pie Chart (Without Extra Text Above) */}
              <div className="w-full md:w-1/3 mt-6 md:mt-0 flex justify-center">
                <Pie
                  data={{
        labels: poll.options,
        datasets: [
          {
            data: poll.votes,
            backgroundColor: colors.slice(0, poll.options.length),
            hoverBackgroundColor: hoverColors.slice(0, poll.options.length),
          },
        ],
      }}
      options={{
        plugins: {
          legend: { display: false },
          tooltip: { bodyFont: { size: 14 } },
          datalabels: {
        color: "white",
        anchor: "center",
        align: "center",
        font: { weight: "bold", size: 16 },
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);

          // Show percentage only if the section has votes
          return value > 0 ? `${percentage}%` : "";
        },
      },
    },
       
        maintainAspectRatio: false,
        responsive: true,
                  }}
                />
              </div>
            </motion.div>
          );
        })
      )}
    </div>
  );
};

export default Polls;
