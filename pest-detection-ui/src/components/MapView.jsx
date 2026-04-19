import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// GEOJSON
const GEO_URL =
  "https://raw.githubusercontent.com/ginseng666/GeoJSON-TopoJSON-Vietnam/master/geojson/regions.json";

// FIX ICON
delete L.Icon.Default.prototype._getIconUrl;

const icon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [28, 28],
});

// FIX MAP SIZE
function FixMap() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 300);
  }, [map]);

  return null;
}

export default function MapView({
  reports = [],
  onSelectProvince,
  selectedProvince,
}) {
  const [geoData, setGeoData] = useState(null);

  // load geojson
  useEffect(() => {
    fetch(GEO_URL)
      .then((res) => {
        if (!res.ok) throw new Error("GeoJSON lỗi");
        return res.json();
      })
      .then((data) => setGeoData(data))
      .catch((err) => console.error(err));
  }, []);

  //  detect ổ dịch
  const detectOutbreaks = (reports) => {
    const clusters = [];

    reports.forEach((r) => {
      const lat = parseFloat(r.lat);
      const lng = parseFloat(r.lng);

      if (isNaN(lat) || isNaN(lng)) return;

      let found = false;

      for (let c of clusters) {
        const dist = Math.sqrt(
          (lat - c.lat) ** 2 + (lng - c.lng) ** 2
        );

        // cùng loài + gần nhau
        if (dist < 0.2 && r.pest_name === c.pest_name) {
          c.count++;
          found = true;
          break;
        }
      }

      if (!found) {
        clusters.push({
          lat,
          lng,
          pest_name: r.pest_name,
          count: 1,
        });
      }
    });

    return clusters;
  };

  const outbreaks = detectOutbreaks(reports);

  // style tỉnh
  const style = (feature) => ({
    fillColor:
      feature.properties.NAME_1 === selectedProvince
        ? "#ef4444"
        : "#60a5fa",
    weight: 1,
    color: "#fff",
    fillOpacity: 0.5,
  });

  const highlightStyle = {
    weight: 2,
    color: "#000",
    fillOpacity: 0.7,
  };

  // event tỉnh
  const onEachFeature = (feature, layer) => {
    const name = feature.properties.NAME_1;

    layer.on({
      mouseover: (e) => {
        e.target.setStyle(highlightStyle);
      },
      mouseout: (e) => {
        e.target.setStyle(style(feature));
      },
      click: (e) => {
        onSelectProvince(name);
        const map = e.target._map;
        map.fitBounds(e.target.getBounds());
      },
    });
  };

  return (
    <MapContainer
      center={[16, 108]}
      zoom={6}
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "16px",
      }}
    >
      <FixMap />

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/*  MARKERS */}
      {reports.map((r, i) => {
        const lat = parseFloat(r.lat);
        const lng = parseFloat(r.lng);

        if (isNaN(lat) || isNaN(lng)) return null;

        return (
          <Marker
            key={`${lat}-${lng}-${i}`}
            position={[lat, lng]}
            icon={icon}
          >
            <Popup>
              <b>{r.pest_name}</b> <br />
              Cây: {r.plant} <br />
              Mức độ: {r.severity}
            </Popup>
          </Marker>
        );
      })}

      {/*  VÙNG DỊCH */}
      {outbreaks.map((c, i) => {
        if (c.count < 4) return null;

        return (
          <Circle
            key={i}
            center={[c.lat, c.lng]}
            radius={10 + c.count * 300} 
            pathOptions={{
              color:
                c.count > 8
                  ? "darkred"
                  : c.count > 5
                  ? "red"
                  : "orange",
              fillColor: "red",
              fillOpacity: Math.min(c.count / 10, 0.5),
            }}
          >
            <Popup>
              Ổ dịch: {c.pest_name} <br />
              Số báo cáo: {c.count}
            </Popup>
          </Circle>
        );
      })}

      {/* 🌍 GEOJSON */}
      {geoData && (
        <GeoJSON
          data={geoData}
          style={style}
          onEachFeature={onEachFeature}
        />
      )}
    </MapContainer>
  );
}