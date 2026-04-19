import UploadBox from "../components/UploadBox";
import HistoryList from "../components/HistoryList";
import useHistory from "../components/hooks/useHistory";
import { useState } from "react";
import RightSiderBar from "../components/layout/RightSiderBar";

export default function Home() {
  const { history, addHistory, removeHistory, clearHistory } = useHistory();
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex gap-6 p-6 bg-gray-100 min-h-screen pr-80">

      {/* LEFT CONTENT */}
      <div className="flex-1 flex flex-col gap-6">

        {/* Upload */}
        <UploadBox
          selected={selected}
          addHistory={addHistory}
        />

        {/* History */}
        <HistoryList
          history={history}
          onSelect={setSelected}
          onDelete={removeHistory}
          onClear={clearHistory}
        />

      </div>

      {/* RIGHT SIDEBAR */}
      <RightSiderBar />

    </div>
  );
}