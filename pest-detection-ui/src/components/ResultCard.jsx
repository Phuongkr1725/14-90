import pestInfo from "./pestInfo";

export default function ResultCard({ data }) {
  if (!data) return null;

  const { prediction } = data;
  const extra = pestInfo[prediction.class_name];

  if (!extra) return null;

  const confidence = (prediction.confidence * 100).toFixed(2);


  let level = "Thấp";
  let color = "bg-green-500";

  if (confidence > 80) {
    level = "Cao";
    color = "bg-red-500";
  } else if (confidence > 50) {
    level = "Trung bình";
    color = "bg-yellow-500";
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {extra.name}
          </h2>
          <p className="text-sm text-gray-500">
            {prediction.class_name}
          </p>
        </div>

        <div className={`text-white px-3 py-1 rounded-full text-sm ${color}`}>
          {level}
        </div>
      </div>

      {/* CONFIDENCE BAR */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Độ tin cậy</span>
          <span className="font-semibold">{confidence}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-green-500"
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>

      {/* INFO GRID */}
      <div className="grid gap-4">

        {/* DESCRIPTION */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-1">
            Mô tả
          </h3>
          <p className="text-gray-600 text-sm">
            {extra.description}
          </p>
        </div>

        {/* SYMPTOMS */}
        <div className="bg-yellow-50 p-4 rounded-xl">
          <h3 className="font-semibold text-yellow-700 mb-1">
            Triệu chứng
          </h3>
          <p className="text-gray-700 text-sm">
            {extra.symptoms}
          </p>
        </div>

        {/* SOLUTION */}
        <div className="bg-green-50 p-4 rounded-xl">
          <h3 className="font-semibold text-green-700 mb-1">
            Cách xử lý
          </h3>
          <p className="text-gray-700 text-sm">
            {extra.solution}
          </p>
        </div>

      </div>
    </div>
  );
}