import { useState } from "react";

export default function NotFound() {
  const [chek, setchek] = useState(true);
  const handleChange = (e) => {
    console.log(e.target.checked);
    setchek((prev) => !prev);
  };
  return (
    <div className="h-[80dvh] flex items-center justify-center">
      <div className="text-xl font-bold">404 NotFound</div>
      <input type="checkbox" onChange={handleChange} checked={chek} />
    </div>
  );
}
