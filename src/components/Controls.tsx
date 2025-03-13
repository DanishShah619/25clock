import React from "react";

interface ControlsProps {
  isRunning: boolean;
  onReset: () => void;
  
  onStartStop: () => void; 
}

const Controls: React.FC<ControlsProps> = ({ isRunning: _isRunning, onReset,onStartStop }) => {
  return (
    <div className="flex gap-4">
      <button id="start_stop" className="p-2 bg-green-500 rounded"onClick={onStartStop}>Start / Stop</button>
      <button id="reset" onClick={onReset} className="p-2 bg-red-500 rounded">Reset</button>
    </div>
  );
};

export default Controls;
