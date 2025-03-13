import React, { MutableRefObject } from "react";

interface BeepProps {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
}

const Beep: React.FC<BeepProps> = ({ audioRef }) => {
  return (
    <audio
      id="beep"
      ref={audioRef}
      src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3"
    />
  );
};

export default Beep;
