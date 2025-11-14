import { useState } from "react";

export default function InputWithToggle({
  password,
  setPassword,
}: {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [visible, setVisible] = useState(false);
  const typeInput = visible ? "text" : "password";
  return (
    <div className="flex relative items-center">
      <input
        type={typeInput}
        placeholder="Password"
        required
        className="inputan w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p
        className="absolute right-3"
        onClick={() => setVisible((prev) => !prev)}
      >
        {visible ? (
          <i className="fa-solid fa-eye text-blue-600"></i>
        ) : (
          <i className="fa-solid fa-eye-slash text-blue-600"></i>
        )}
      </p>
    </div>
  );
}
