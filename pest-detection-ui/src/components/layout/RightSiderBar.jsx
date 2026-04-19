import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function RightSiderBar() {
  const [open, setOpen] = useState(true);
  const [weather, setWeather] = useState(null);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const API_KEY = "3a6bf35ed1f62f3fb1ad90a873b53c17";

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const daysOfWeek = ["S","M","T","W","T","F","S"];

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  //  WEATHER FETCH
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWeather();
  }, []);

  const nextMonth = () => {
    setCurrentMonth(prev => {
      const next = (prev + 1) % 12;
      if (prev === 11) setCurrentYear(y => y + 1);
      return next;
    });
  };

  const prevMonth = () => {
    setCurrentMonth(prev => {
      const next = (prev - 1 + 12) % 12;
      if (prev === 0) setCurrentYear(y => y - 1);
      return next;
    });
  };

  const calendarDays = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1)
  ];

  return (
    <aside className={`
      h-screen fixed right-0 top-0 z-50
      flex flex-col transition-all duration-300
      ${open ? "w-72" : "w-16"}
      bg-green-50 border-l border-green-200
    `}>

      {/* TOGGLE */}
      <div className="flex justify-end p-2">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-full bg-green-100 hover:bg-green-200"
        >
          {open ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      {open && (
        <div className="flex-1 overflow-y-auto p-4">

          {/* PROFILE */}
          <div className="bg-white border border-green-200 rounded-xl p-3 mb-4">
            <p className="font-semibold text-green-700">Phuongkr05</p>
            <p className="text-xs text-gray-500">abcdef@gmail.com</p>
          </div>

          {/* CALENDAR */}
          <div className="bg-white border border-green-200 rounded-xl p-3 mb-4">

            <div className="flex justify-between mb-2">
              <h3 className="font-semibold text-green-700">
                {monthNames[currentMonth]} {currentYear}
              </h3>
            </div>

            <div className="grid grid-cols-7 text-center text-sm text-green-600 mb-2">
              {daysOfWeek.map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 text-center gap-y-1">
              {calendarDays.map((day, i) => (
                <div key={i} className="w-7 h-7 mx-auto flex items-center justify-center">
                  {day}
                </div>
              ))}
            </div>

          </div>

          {/* WEATHER */}
          <div className="bg-white border border-green-200 rounded-xl p-4 shadow-sm">

            <h3 className="font-semibold text-green-700 mb-2">
              Thời tiết Hà Nội
            </h3>

            {!weather ? (
              <p className="text-sm text-gray-500">Đang tải...</p>
            ) : (
              <div className="space-y-2 text-sm">

                <div className="flex justify-between">
                  <span>Nhiệt độ</span>
                  <span className="font-semibold">{weather.main?.temp}°C</span>
                </div>

                <div className="flex justify-between">
                  <span>Độ ẩm</span>
                  <span className="font-semibold">{weather.main?.humidity}%</span>
                </div>

                <div className="flex justify-between">
                  <span>Thời tiết</span>
                  <span className="font-semibold">
                    {weather.weather?.[0]?.main}
                  </span>
                </div>

              </div>
            )}

          </div>

        </div>
      )}
    </aside>
  );
}