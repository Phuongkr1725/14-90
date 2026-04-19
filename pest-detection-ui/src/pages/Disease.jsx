import { useEffect, useState } from "react";

export default function DiseasePage() {
  const [pests, setPests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [details, setDetails] = useState([]);
  // load danh sách dịch
  useEffect(() => {
    fetch("http://localhost:5000/pests")
      .then(res => res.json())
      .then(data => setPests(data));
  }, []);

  // load chi tiết khi click
  const loadDetail = async (name) => {
    setSelected(name);

    const res = await fetch(`http://localhost:5000/reports/pest/${name}`);
    const data = await res.json();

    setDetails(data);
  };

  return (
    <div className="flex gap-6 p-6">

      {/* LEFT: LIST */}
      <div className="w-1/3 bg-white p-4 rounded-2xl shadow">
        <h2 className="font-semibold mb-4">Danh sách dịch bệnh</h2>

        <div className="flex flex-col gap-3">
          {pests.map((p, i) => (
            <div
              key={i}
              onClick={() => loadDetail(p.pest_name)}
              className="p-3 rounded-xl cursor-pointer hover:bg-green-100 transition flex justify-between"
            >
              <span>{p.pest_name}</span>
              <span className="text-sm text-gray-500">
                {p.total}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: DETAIL */}
      <div className="flex-1 bg-white p-4 rounded-2xl shadow">
        {!selected ? (
          <p className="text-gray-500">Chọn dịch bệnh để xem</p>
        ) : (
          <>
            <h2 className="font-semibold text-lg mb-4">
              {selected}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {details.map((d, i) => (
                <div key={i} className="border p-3 rounded-xl">

                  {d.image_url && (
                    <img
                      src={`http://localhost:5000${d.image_url}`}
                      alt=""
                      className="h-32 w-full object-cover rounded mb-2"
                    />
                  )}

                  <p><b>Cây:</b> {d.plant}</p>
                  <p><b>Triệu chứng:</b> {d.symptoms}</p>
                  <p><b>Mức độ:</b> {d.severity}</p>
                  <p className="text-sm text-gray-500">
                    {d.lat}, {d.lng}
                  </p>

                </div>
              ))}
            </div>
          </>
        )}
      </div>

    </div>
  );
}