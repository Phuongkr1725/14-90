import { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import useDetect from "./hooks/useDetect";
import ResultCard from "../components/ResultCard";

export default function UploadBox({ selected, addHistory }) {
  const [preview, setPreview] = useState(null);
  const [hasSaved, setHasSaved] = useState(false); // ✅ NEW

  const { detect, result, loading, error } = useDetect();

  useEffect(() => {
    if (selected) {
      setPreview(selected.image);
      setHasSaved(true); 
    }
  }, [selected]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setHasSaved(false); 

    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageUrl = e.target.result;
      setPreview(imageUrl);

      await detect(file);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!result || !result.success || !preview || hasSaved) return;

    const newItem = {
      id: Date.now(),
      image: preview,
      name: result.prediction.class_name,
      confidence: result.prediction.confidence,
      time: new Date().toLocaleString(),
      result,
    };

    addHistory(newItem);
    setHasSaved(true); 
  }, [result, preview, hasSaved, addHistory]);

  const displayResult = result || selected?.result;

  return (
    <div className="flex flex-col gap-5">
      {!preview && (
        <label className="h-[280px] border-2 border-green-400 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-white shadow hover:shadow-lg transition">
          <FaUpload className="text-4xl text-green-500 mb-3" />
          <p className="text-green-600 font-medium">
            Tải ảnh cần nhận diện lên
          </p>
          <input type="file" hidden onChange={handleUpload} />
        </label>
      )}

      {preview && (
        <>
          <div className="rounded-2xl overflow-hidden shadow-lg border">
            <img
              src={preview}
              alt=""
              className="w-full h-[300px] object-cover"
            />
          </div>

          <label className="mx-auto cursor-pointer border border-green-500 px-4 py-2 rounded-xl text-green-600 hover:bg-green-50 transition">
            Tải ảnh lên
            <input type="file" hidden onChange={handleUpload} />
          </label>

          {loading && (
            <p className="text-center text-gray-500">
              Đang nhận diện...
            </p>
          )}

          {displayResult && !loading && (
            <ResultCard data={displayResult} />
          )}

          {error && (
            <p className="text-red-500 text-center">
              {error}
            </p>
          )}
        </>
      )}
    </div>
  );
}