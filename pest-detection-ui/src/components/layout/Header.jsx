import { FaBell, FaSearch } from "react-icons/fa";

export default function Header() {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">

      {/* Search */}
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-96 shadow-inner">
        <FaSearch className="text-gray-500" />
        <input
          className="bg-transparent outline-none ml-2 w-full"
          placeholder="Tìm kiếm..."
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        <div className="relative cursor-pointer hover:scale-110 transition">
          <FaBell className="text-xl text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            3
          </span>
        </div>

        <img
          src="https://i.pravatar.cc/40"
          alt=""
          className="w-9 h-9 rounded-full border hover:scale-110 transition"
        />

      </div>
    </div>
  );
}