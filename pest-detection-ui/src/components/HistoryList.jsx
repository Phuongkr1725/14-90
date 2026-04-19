import { FaClock, FaTrash } from "react-icons/fa";

export default function HistoryList({
  history,
  onSelect,
  onDelete,
  onClear,
}) {
  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold flex items-center gap-2">
          <FaClock /> Tra cứu gần đây
        </h2>

        {history.length > 0 && (
          <button
            onClick={onClear}
            className="text-sm text-red-500 hover:underline"
          >
            Xoá tất cả
          </button>
        )}
      </div>

      {/* EMPTY */}
      {history.length === 0 ? (
        <div className="bg-white p-4 rounded-xl shadow text-gray-500">
          Chưa có dữ liệu
        </div>
      ) : (
        <div className="flex flex-col gap-3">

          {history.map((item) => (
            <div
              key={item.id}
              className="bg-white p-3 rounded-xl shadow flex items-center gap-3 hover:shadow-md transition group"
            >

              {/* CLICK LOAD */}
              <div
                onClick={() => onSelect(item)}
                className="flex items-center gap-3 flex-1 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Sâu hại • {item.time}
                  </p>
                </div>

                <div className="text-sm text-green-600 font-medium">
                  {(item.confidence * 100).toFixed(0)}%
                </div>
              </div>

              {/* DELETE BUTTON */}
              <button
                onClick={() => onDelete(item.id)}
                className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition"
              >
                <FaTrash />
              </button>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}