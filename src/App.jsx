import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState(""); // User input
  const [correction, setCorrection] = useState(""); // Corrected text
  const [errorType, setErrorType] = useState(""); // Type of error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!text.trim()) {
      setError("⚠️ Please enter some text.");
      return;
    }

    setLoading(true);
    setError("");
    setCorrection("");
    setErrorType("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/correct", {
        sentence: text,
      });

      if (response.data.error) {
        setError(`❌ API Error: ${response.data.error}`);
      } else {
        setCorrection(response.data.corrected);
        setErrorType(response.data.error_type);
      }
    } catch (err) {
      setError("❌ Failed to connect to the API. Is Flask running?");
      console.error("API Error:", err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Grammar Checker</h1>

      {/* Text Input */}
      <textarea
        className="w-full max-w-md p-3 border border-gray-400 rounded-md focus:ring focus:ring-blue-300 shadow-md"
        rows="4"
        placeholder="Enter a sentence..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      {/* Send Button */}
      <button
        onClick={handleSend}
        className={`mt-3 px-4 py-2 rounded-md text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={loading}
      >
        {loading ? "Checking..." : "Check Grammar"}
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-3">{error}</p>}

      {/* Display API Response */}
      {correction && (
        <div className="mt-4 p-3 border border-gray-300 rounded-md bg-white w-full max-w-md shadow">
          <p className="text-lg">
            <strong className="text-green-600">✅ Corrected:</strong>{" "}
            {correction}
          </p>
          <p className="text-gray-700">
            <strong className="text-red-500">⚠️ Error Type:</strong> {errorType}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
