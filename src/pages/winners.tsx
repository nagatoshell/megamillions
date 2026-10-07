import { useEffect, useState } from "react";
import { FaMale, FaFemale } from "react-icons/fa";
import Testimonials from "../components/testimonial";

const JSONBIN_URL = "https://api.jsonbin.io/v3/b/6ac62f67ffd5d1605355bd30";
const JSONBIN_API_KEY =
  "$2a$10$yti1izYQ7PKY9IhwxrQiuuIk8TZDdxM6nzYFnduMOvJtKIdyRhBB.";

interface Winner {
  id: number;
  fullName: string;
  amount: number;
  status: string;
  gender: string;
  address: string;
}

const shuffleArray = (array: Winner[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Winners = () => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await fetch(JSONBIN_URL, {
          headers: { "X-Master-Key": JSONBIN_API_KEY },
        });

        const data = await response.json();
        setWinners(shuffleArray(data.record || []));
      } catch (error) {
        console.error("Error fetching winners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWinners();
  }, []);

  const getStatusColor = (status: string) => {
    if (status === "Delivered") return "bg-green-100 text-green-700";
    if (status === "Pending") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <>
      <div className="max-w-5xl mx-auto mt-12 px-4">
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            🏆 Recent Winners
          </h2>

          <div className="overflow-x-auto">
            <div className="min-w-[500px]">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border rounded-lg p-4 animate-pulse"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>

                        <div>
                          <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
                          <div className="h-3 w-24 bg-gray-200 rounded"></div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="h-4 w-16 bg-gray-300 rounded"></div>
                        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : winners.length === 0 ? (
                <p className="text-center text-gray-500">No winners yet</p>
              ) : (
                <div className="space-y-4">
                  {winners.map((winner) => (
                    <div
                      key={winner.id}
                      className="flex items-center justify-between border rounded-lg p-4 hover:shadow-md transition"
                    >
                      {/* LEFT SIDE */}
                      <div className="flex items-center gap-4">
                        <div className="text-2xl text-gray-600">
                          {winner.gender === "Male" ? <FaMale /> : <FaFemale />}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800">
                            {winner.fullName}
                          </p>

                          <p className="text-sm text-gray-500">
                            {winner.address}
                          </p>
                        </div>
                      </div>

                      {/* RIGHT SIDE */}
                      <div className="flex items-center gap-6">
                        <div className="text-lg font-semibold text-gray-800 whitespace-nowrap">
                          ${winner.amount.toLocaleString()}
                        </div>

                        <span
                          className={`px-3 py-1 text-sm rounded-full ${getStatusColor(
                            winner.status,
                          )}`}
                        >
                          {winner.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Testimonials />
    </>
  );
};

export default Winners;
