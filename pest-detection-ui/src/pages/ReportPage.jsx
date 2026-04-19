import { FaImage, FaMapMarkerAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import RightSiderBar from "../components/layout/RightSiderBar";

export default function ReportPage() {
  const [form, setForm] = useState({
    name: "",
    target: "",
    symptoms: "",
    solution: "",
    extra: "",
    reporter: "",
    plant: "",
    severity: "Nhẹ",
    location: "",
  });

  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt không hỗ trợ GPS");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        handleChange(
          "location",
          `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`
        );
      },
      () => alert("Không lấy được vị trí"),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    console.log({ ...form, image });
    setSuccess(true);

    setForm({
      name: "",
      target: "",
      symptoms: "",
      solution: "",
      extra: "",
      reporter: "",
      plant: "",
      severity: "Nhẹ",
      location: "",
    });

    setImage(null);
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="flex bg-gray-100 min-h-screen pr-80 gap-6 p-6">

      {/* ===== POPUP ===== */}
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white px-8 py-6 rounded-2xl shadow-xl text-center">
            <p className="text-green-600 font-semibold text-lg">
              Hệ thống đã ghi nhận
            </p>
          </div>
        </div>
      )}

      {/* ===== LEFT ===== */}
      <div className="flex-1">

        {/* UPLOAD */}
        {!image ? (
          <label className="bg-white border-2 border-green-500 rounded-2xl h-[260px] flex flex-col items-center justify-center shadow mb-6 cursor-pointer">
            <FaImage className="text-5xl text-green-500 mb-3" />
            <p className="text-green-600 font-medium">
              Tải ảnh sâu bệnh
            </p>
            <input type="file" hidden onChange={handleUpload} />
          </label>
        ) : (
          <div className="mb-6">
            <img
              src={image}
              className="w-full h-[260px] object-cover rounded-2xl shadow"
            />
          </div>
        )}

        {/* FORM */}
        <div className="grid grid-cols-2 gap-6">

          <div className="flex flex-col gap-4">
            <input placeholder="Tên người báo cáo"
              value={form.reporter}
              onChange={(e) => handleChange("reporter", e.target.value)}
              className="p-3 border rounded-xl"
            />

            <input placeholder="Cây trồng"
              value={form.plant}
              onChange={(e) => handleChange("plant", e.target.value)}
              className="p-3 border rounded-xl"
            />

            <input placeholder="Tên sâu bệnh"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="p-3 border rounded-xl"
            />

            <textarea placeholder="Triệu chứng"
              value={form.symptoms}
              onChange={(e) => handleChange("symptoms", e.target.value)}
              className="p-3 border rounded-xl h-32"
            />
          </div>

          <div className="flex flex-col gap-4">

            <select
              value={form.severity}
              onChange={(e) => handleChange("severity", e.target.value)}
              className="p-3 border rounded-xl"
            >
              <option>Nhẹ</option>
              <option>Trung bình</option>
              <option>Nặng</option>
            </select>

            <div className="flex gap-2">
              <input
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="flex-1 p-3 border rounded-xl"
                placeholder="Vị trí"
              />
              <button
                onClick={getLocation}
                className="bg-green-600 text-white px-4 rounded-xl"
              >
                <FaMapMarkerAlt />
              </button>
            </div>

            <input placeholder="Đối tượng gây hại"
              value={form.target}
              onChange={(e) => handleChange("target", e.target.value)}
              className="p-3 border rounded-xl"
            />

            <textarea placeholder="Biện pháp xử lý"
              value={form.solution}
              onChange={(e) => handleChange("solution", e.target.value)}
              className="p-3 border rounded-xl h-32"
            />
          </div>

        </div>

        {/* BUTTON */}
        <div className="flex gap-4 justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-2 rounded-full"
          >
            Báo cáo
          </button>

          <button
            onClick={() => setForm({})}
            className="bg-red-500 text-white px-6 py-2 rounded-full"
          >
            Hủy
          </button>
        </div>

      </div>

      {/* RIGHT SIDEBAR */}
      <RightSiderBar />

    </div>
  );
}