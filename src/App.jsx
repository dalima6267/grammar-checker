import React, { useState } from "react";
import axios from "axios";

const GrammarChecker = () => {
  const [text, setText] = useState("");
  const [correction, setCorrection] = useState("");
  const [errorType, setErrorType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError("Please enter some text.");
      return;
    }

    setLoading(true);
    setError("");
    setCorrection("");
    setErrorType("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/correct", {
        text: text,
      });

      setCorrection(response.data.corrected);
      setErrorType(response.data.error_type);
    } catch (err) {
      setError("Error correcting the text. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setCorrection("");
    setErrorType("");
    setError("");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center">📝 Grammar Checker</h1>

      <textarea
        className="w-full border rounded-md p-3 text-gray-800"
        rows="6"
        placeholder="Enter your sentence..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <div className="flex justify-between">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Grammar"}
        </button>

        <button
          onClick={handleClear}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-xl"
        >
          Clear
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {correction && (
        <div className="mt-4 bg-green-50 p-4 rounded-xl shadow-inner">
          <p className="text-gray-700">
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
};

export default GrammarChecker;
