import { useState, useRef, useEffect } from 'react';
import './App.scss';
import { chillHop } from './data';
import Player from './components/Player/Player';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [musics, setMusics] = useState(chillHop());
  const [sidebarShow, setSidebarShow] = useState(false);
  const [max, setMax] = useState('');
  let [timerSec, setTimerSec] = useState(0);
  let [gradientWidth, setGradientWidth] = useState(0);
  let [duration, setDuration] = useState('');
  let [playing, setPlaying] = useState(false);
  let audioRef = useRef(null);
  let activeIndex;
  const [activeMusic, setActiveMusic] = useState(
    musics.find((el, index) => {
      if (el.active) {
        activeIndex = index;
        return true;
      }
    })
  );

  useEffect(() => {
    audioRef.current.addEventListener('loadedmetadata', () => {
      setMax(audioRef.current.duration)
      let minutes = Math.floor(audioRef.current.duration / 60);
      let seconds = Math.floor(audioRef.current.duration - minutes * 60);
      setDuration(`${minutes}:${seconds}`);
    });

  }, []);
  function changeActivePrev() {
    if (activeIndex == 0) activeIndex = musics.length - 1;
    else activeIndex--;
    changeActivity(activeIndex)
  }
  function changeActiveNext() {
    if (activeIndex == musics.length - 1) activeIndex = 0;
    else activeIndex++;
    changeActivity(activeIndex)
  }
  function changeActive(activeIndex) {
    changeActivity(activeIndex)
  }

  function changeActivity(activeIndex) {
    activeMusic.active = false;
    let newActiveMusic = musics.find((_, index) => {
      return index == activeIndex;
    })
    newActiveMusic.active = true;
    setActiveMusic(newActiveMusic);
    audioRef.current.pause();
    audioRef.current.load();
    if (playing) audioRef.current.play();
    setTimerSec(0);
    setGradientWidth(0);
  }
  return (
    <div className="app">
      <audio ref={audioRef} >
        <source src={activeMusic.audio} type="audio/mpeg" />
      </audio>
      <Sidebar
        musics={musics}
        sidebarShow={sidebarShow}
        changeActive={changeActive} />
      <Player
        setGradientWidth={setGradientWidth}
        gradientWidth={gradientWidth}
        timerSec={timerSec}
        setTimerSec={setTimerSec}
        setPlaying={setPlaying}
        playing={playing}
        changeActiveNext={changeActiveNext}
        changeActivePrev={changeActivePrev}
        max={max}
        duration={duration}
        audio={audioRef.current}
        activeMusic={activeMusic}
        sidebarShow={sidebarShow}
        setSidebarShow={setSidebarShow} />
    </div>
  );
}

export default App;
