import { useState } from "react";
import { detectPest } from "../../services/api";

export default function useDetect() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const detect = async (file) => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const data = await detectPest(file);
      setResult(data);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return { detect, loading, result, error };
}