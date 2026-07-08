import React, { useState } from "react";
import { Calendar } from "./Calendar.jsx";

export default {
  title: "Components/Calendar",
  component: Calendar,
  parameters: { layout: "padded" },
};

export const Default = {
  render: () => {
    const [value, setValue] = useState(new Date());
    return <Calendar value={value} onSelect={setValue} />;
  },
};

export const NoSelection = {
  render: () => <Calendar />,
};

export const Range = {
  render: () => {
    const [range, setRange] = useState({ from: undefined, to: undefined });
    return (
      <Calendar
        mode="range"
        numberOfMonths={2}
        value={range}
        onSelect={setRange}
      />
    );
  },
};
