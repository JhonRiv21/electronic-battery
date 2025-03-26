import { useRef, useEffect, useState } from 'react';
import './App.css'

const dictionary = {
  "Q": {
    name: "Heater 1",
    audio: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3",
  },
  "W": {
    name: "Heater 2",
    audio: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3",
  },
  "E": {
    name: "Heater 3",
    audio: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3",
  },
  "A": {
    name: "Heater 4",
    audio: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3",
  },
  "S": {
    name: "Clap",
    audio: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3",
  },
  "D": {
    name: "Open HH",
    audio: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3",
  },
  "Z": {
    name: "Kick n' Hat",
    audio: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3",
  },
  "X": {
    name: "Kick",
    audio: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3",
  },
  "C": {
    name: "Closed HH",
    audio: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3",
  }
};

const ElectronicBattery = () => {
  const audioRef = useRef({});
  const [ power, setPower ] = useState(true);
  const [ name, setName ] = useState("");
  const [ volume, setVolume ] = useState(0.5);
  
  const playAudio = (key) => {
    if (audioRef.current[key] && power) {
      audioRef.current[key].currentTime = 0;
      audioRef.current[key].play();
      setName(dictionary[key].name);
    };
  };
  
  const managerVolume = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
  }
  
  useEffect(() => {
    Object.values(audioRef.current).forEach(audio => {
      if (audio) audio.volume = volume;
    });
  }, [volume]);
  
  useEffect(() => {
    const keyDown = (event) => {
      const key = event.key.toUpperCase();
      if (!power) return;
      if (dictionary[key]) {
        playAudio(key);
      }
    };
    
    window.addEventListener("keydown", keyDown);
    
    return () => {
      window.removeEventListener("keydown", keyDown);
    }
  }, [power])
  
  return (
    <div className="container" id="drum-machine">
      <div className="container-buttons-play">
        {Object.entries(dictionary).map(([key, value]) => (
          <button className="drum-pad buttons-play" id={key} key={key} onClick={() => playAudio(key)}>
            <p>{key}</p>
            <audio
              className="clip"
              id={key}
              ref={(el) => audioRef.current[key] = el}
              controls
              src={value.audio}
              type="audio/mp3"
            ></audio>
          </button>
        ))}
      </div>
      <div className="container-tools">
        <div className="power">
          <p>Power</p>
          <button onClick={() => setPower(prev => !prev)}>{power ? 'On' : 'Off'}</button>
        </div>
         
        <div className="kick">
          <p id="display">{name}</p>
        </div>
        
        <div className="volume">
           <label for="range">Volume</label>
           <input onChange={managerVolume} type="range" min="0" max="1" step="0.1" value={volume} class="slider" id="range"/>
        </div>
        
      </div>
    </div>
  )
}

export default ElectronicBattery
