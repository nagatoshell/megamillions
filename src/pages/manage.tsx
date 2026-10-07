import { useEffect, useState } from "react";

const JSONBIN_URL = "https://api.jsonbin.io/v3/b/6ac62f67ffd5d1605355bd30";
const JSONBIN_API_KEY = "$2a$10$yti1izYQ7PKY9IhwxrQiuuIk8TZDdxM6nzYFnduMOvJtKIdyRhBB.";

interface Winner {
  id: number;
  fullName: string;
  amount: number;
  status: string;
  gender: string;
  address: string;
}

const emptyWinner: Winner = {
  id: 0,
  fullName: "",
  amount: 0,
  status: "Pending",
  gender: "Male",
  address: "",
};

const ManageWinners = () => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [editingWinner, setEditingWinner] = useState<Winner | null>(null);

  const [newWinner, setNewWinner] = useState<Winner>(emptyWinner);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWinners();
  }, []);

  const fetchWinners = async () => {
    try {
      const response = await fetch(JSONBIN_URL, {
        headers: {
          "X-Master-Key": JSONBIN_API_KEY,
        },
      });

      const data = await response.json();
      setWinners(data.record || []);
    } catch (error) {
      console.error("Error fetching winners:", error);
    }
  };

  // =========================
  // ADD WINNER
  // =========================

  const handleAddWinner = async () => {
    if (
      !newWinner.fullName ||
      newWinner.amount <= 0 ||
      !newWinner.address
    ) {
      alert("Please enter valid details");
      return;
    }

    setLoading(true);

    const updatedWinners = [
      ...winners,
      {
        ...newWinner,
        id: Date.now(),
      },
    ];

    try {
      const response = await fetch(JSONBIN_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": JSONBIN_API_KEY,
        },
        body: JSON.stringify(updatedWinners),
      });

      if (!response.ok) {
        throw new Error("Failed to save winner");
      }

      setWinners(updatedWinners);
      setNewWinner(emptyWinner);
    } catch (error) {
      console.error("Error adding winner:", error);
      alert("Failed to add winner");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // OPEN EDIT MODAL
  // =========================

  const handleEditWinner = (winner: Winner) => {
    setEditingWinner({ ...winner });
  };

  // =========================
  // UPDATE WINNER
  // =========================

  const handleUpdateWinner = async () => {
    if (!editingWinner) return;

    if (
      !editingWinner.fullName ||
      editingWinner.amount <= 0 ||
      !editingWinner.address
    ) {
      alert("Please enter valid details");
      return;
    }

    setLoading(true);

    const updatedWinners = winners.map((winner) =>
      winner.id === editingWinner.id ? editingWinner : winner
    );

    try {
      const response = await fetch(JSONBIN_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": JSONBIN_API_KEY,
        },
        body: JSON.stringify(updatedWinners),
      });

      if (!response.ok) {
        throw new Error("Failed to update winner");
      }

      setWinners(updatedWinners);

      // Close edit section
      setEditingWinner(null);
    } catch (error) {
      console.error("Error updating winner:", error);
      alert("Failed to update winner");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE WINNER
  // =========================

  const handleRemoveWinner = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this winner?"
    );

    if (!confirmDelete) return;

    const updatedWinners = winners.filter(
      (winner) => winner.id !== id
    );

    try {
      const response = await fetch(JSONBIN_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": JSONBIN_API_KEY,
        },
        body: JSON.stringify(updatedWinners),
      });

      if (!response.ok) {
        throw new Error("Failed to remove winner");
      }

      setWinners(updatedWinners);
    } catch (error) {
      console.error("Error removing winner:", error);
      alert("Failed to remove winner");
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          🛠 Manage Winners
        </h2>

        {/* =========================
            ADD WINNER SECTION
        ========================== */}

        <div className="mb-8 border rounded-xl p-5 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">
            Add New Winner
          </h3>

          <input
            type="text"
            placeholder="Full Name"
            value={newWinner.fullName}
            onChange={(e) =>
              setNewWinner({
                ...newWinner,
                fullName: e.target.value,
              })
            }
            className="border p-3 w-full mb-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Address"
            value={newWinner.address}
            onChange={(e) =>
              setNewWinner({
                ...newWinner,
                address: e.target.value,
              })
            }
            className="border p-3 w-full mb-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Amount"
            value={newWinner.amount || ""}
            onChange={(e) =>
              setNewWinner({
                ...newWinner,
                amount: Number(e.target.value),
              })
            }
            className="border p-3 w-full mb-3 rounded-lg"
          />

          <select
            value={newWinner.status}
            onChange={(e) =>
              setNewWinner({
                ...newWinner,
                status: e.target.value,
              })
            }
            className="border p-3 w-full mb-3 rounded-lg"
          >
            <option value="Delivered">Delivered</option>
            <option value="Pending">Pending</option>
            <option value="On Hold">On Hold</option>
          </select>

          <select
            value={newWinner.gender}
            onChange={(e) =>
              setNewWinner({
                ...newWinner,
                gender: e.target.value,
              })
            }
            className="border p-3 w-full mb-4 rounded-lg"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <button
            onClick={handleAddWinner}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Saving..." : "Add Winner"}
          </button>
        </div>

        {/* =========================
            WINNERS LIST
        ========================== */}

        <div className="space-y-3">
          {winners.map((winner) => (
            <div
              key={winner.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border p-4 rounded-xl"
            >
              <div>
                <p className="font-semibold text-gray-900">
                  {winner.fullName}
                </p>

                <p className="text-sm text-gray-600">
                  ${winner.amount.toLocaleString()} •{" "}
                  {winner.status}
                </p>

                <p className="text-xs text-gray-500">
                  {winner.address}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEditWinner(winner)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleRemoveWinner(winner.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =================================================
          EDIT MODAL
      ================================================= */}

      {editingWinner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6">

            {/* Header */}

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Edit Winner
                </h2>

                <p className="text-sm text-gray-500">
                  Update winner information
                </p>
              </div>

              <button
                onClick={() => setEditingWinner(null)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Full Name */}

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>

            <input
              type="text"
              value={editingWinner.fullName}
              onChange={(e) =>
                setEditingWinner({
                  ...editingWinner,
                  fullName: e.target.value,
                })
              }
              className="border p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Address */}

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>

            <input
              type="text"
              value={editingWinner.address}
              onChange={(e) =>
                setEditingWinner({
                  ...editingWinner,
                  address: e.target.value,
                })
              }
              className="border p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Amount */}

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grant Amount
            </label>

            <input
              type="number"
              value={editingWinner.amount}
              onChange={(e) =>
                setEditingWinner({
                  ...editingWinner,
                  amount: Number(e.target.value),
                })
              }
              className="border p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Status */}

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>

            <select
              value={editingWinner.status}
              onChange={(e) =>
                setEditingWinner({
                  ...editingWinner,
                  status: e.target.value,
                })
              }
              className="border p-3 w-full mb-4 rounded-lg"
            >
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
              <option value="On Hold">On Hold</option>
            </select>

            {/* Gender */}

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>

            <select
              value={editingWinner.gender}
              onChange={(e) =>
                setEditingWinner({
                  ...editingWinner,
                  gender: e.target.value,
                })
              }
              className="border p-3 w-full mb-6 rounded-lg"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            {/* Buttons */}

            <div className="flex gap-3">

              <button
                onClick={() => setEditingWinner(null)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateWinner}
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageWinners;