import React, { useMemo, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { getStates } from "cities-states-countries";
import Select from "react-select";

export default function Locationbar() {
  const [selectedOp, setSelectedOp] = useState(null);
  const states = useMemo(() => getStates("India"), []);

  const options = useMemo(() => {
    return states.map((state) => ({
      value: state,
      label: state,
    }));
  }, [states]);

  return (
    <div className="flex items-center justify-between bg-white px-3 py-1 border-b">
      <div className="flex items-center gap-2">
        <FaMapMarkerAlt className="text-[#039cad]" size={25} />

        <Select
          className="w-48"
          value={selectedOp}
          onChange={(selectedOption) => setSelectedOp(selectedOption)}
          options={options}
          isSearchable={true}
          placeholder="Select state..."
        />
      </div>

      <div className="p-2 rounded-full bg-green-100 cursor-pointer">
        <IoIosNotifications className="text-green-700" size={30} />
      </div>
    </div>
  );
}
