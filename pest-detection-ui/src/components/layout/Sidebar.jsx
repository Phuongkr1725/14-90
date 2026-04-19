import { FaBug, FaChartBar, FaMap, FaVirus } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Nhận diện",
      icon: <FaBug />,
      path: "/",
    },
    {
      name: "Báo cáo",
      icon: <FaChartBar />,
      path: "/report",
    },
    {
      name: "Bản đồ",
      icon: <FaMap />,
      path: "/map",
    },
    {
      name: "Dịch bệnh",
      icon: <FaVirus />,
      path: "/disease",
    },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-green-700 to-green-600 text-white p-6 flex flex-col shadow-xl">

      {/* LOGO */}
      <h1 className="text-xl font-bold mb-10 flex items-center gap-2">
        <FaBug /> Pest Detection
      </h1>

      {/* MENU */}
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto">

        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-white text-green-700 font-medium shadow"
                  : "hover:bg-green-500"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}

      </div>

      {/* FOOTER */}
      <div className="text-sm opacity-70 mt-6">
        © 2026 Pest System
      </div>
    </div>
  );
}