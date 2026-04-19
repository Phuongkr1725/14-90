import { useEffect, useState } from "react";
import MapView from "../components/MapView";
import ChartView from "../components/ChartView";
import * as turf from "@turf/turf";


const GEO_URL =
  "https://raw.githubusercontent.com/ginseng666/GeoJSON-TopoJSON-Vietnam/master/geojson/regions.json";

export default function MapPage() {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [geoData, setGeoData] = useState(null);


  useEffect(() => {
    fetch("http://localhost:5000/reports")
      .then((res) => res.json())
      .then((data) => {
        console.log("REPORTS:", data);
        setReports(data || []);
      })
      .catch(() => setReports([]));
  }, []);

  // 🔥 load geojson (fix lỗi 404 + crash)
  useEffect(() => {
    fetch(GEO_URL)
      .then((res) => {
        if (!res.ok) throw new Error("GeoJSON lỗi");
        return res.json();
      })
      .then((data) => {
        console.log("GEO:", data);
        setGeoData(data);
      })
      .catch((err) => console.error(err));
  }, []);


  const pestTypes = [
    "ALL",
    ...new Set(reports.map((r) => r.pest_name)),
  ];

 
  const filteredReports = reports.filter((r) => {
    if (filter !== "ALL" && r.pest_name !== filter) return false;

    if (!selectedProvince || !geoData) return true;

    const point = turf.point([
      parseFloat(r.lng),
      parseFloat(r.lat),
    ]);

    const provinceFeature = geoData.features.find(
      (f) => f.properties.NAME_1 === selectedProvince
    );

    if (!provinceFeature) return true;

    return turf.booleanPointInPolygon(point, provinceFeature);
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col gap-6">

      {/* FILTER */}
      <div className="bg-white p-4 rounded-xl shadow flex gap-4 items-center flex-wrap">
        <span className="font-semibold">Loại sâu:</span>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          {pestTypes.map((type, i) => (
            <option key={i}>{type}</option>
          ))}
        </select>

        {/* tỉnh */}
        {selectedProvince && (
          <div className="bg-green-100 px-3 py-1 rounded-lg flex items-center gap-2">
            📍 {selectedProvince}
            <button
              onClick={() => setSelectedProvince(null)}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* MAP */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-3">Bản đồ dịch bệnh</h2>

        <MapView
          reports={filteredReports}
          onSelectProvince={setSelectedProvince}
          selectedProvince={selectedProvince}
        />
      </div>

      {/* CHART */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-3">Thống kê</h2>
        <ChartView reports={filteredReports} />
      </div>

    </div>
  );
}