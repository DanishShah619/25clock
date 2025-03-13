import React from "react";

interface LengthControlProps {
  title: string;
  id: string;
  length: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const LengthControl: React.FC<LengthControlProps> = ({
  title,
  id,
  length,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="flex flex-col items-center">
      <h2 id={`${id}-label`} className="text-lg font-bold">{title}</h2>
      <div className="flex items-center gap-4">
        <button id={`${id}-decrement`} onClick={onDecrement} className="p-2 bg-gray-700 rounded">-</button>
        <span id={`${id}-length`} className="text-xl">{length}</span>
        <button id={`${id}-increment`} onClick={onIncrement} className="p-2 bg-gray-700 rounded">+</button>
      </div>
    </div>
  );
};

export default LengthControl;
