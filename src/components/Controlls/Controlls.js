import React, { useRef,useState } from 'react'
import './Controlls.scss'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { BsFillPlayFill, BsPauseFill, BsFillVolumeDownFill } from 'react-icons/bs';


function Controlls({ playing, audio, setPlaying, setTimerSec, setIntervalId, intervalId, changeActivePrev, changeActiveNext }) {
 const [volumeShow, setVolumeShow] = useState(false);
    let input = useRef();

    function play() {
        audio.play();
        setPlaying(true);
        setIntervalId(setInterval(() => {
            setTimerSec(audio.currentTime);
        }, 1000));
    }
    function pause() {
        audio.pause();
        setPlaying(false);
        clearInterval(intervalId);
    }

    function changeVolume() {
        audio.volume = input.current.value;
    }

    return (
        <div className='controls'>
            <GrFormPrevious onClick={changeActivePrev} />
            {playing ? <BsPauseFill onClick={pause} /> : <BsFillPlayFill onClick={play} />}
            <GrFormNext onClick={changeActiveNext} />
            <BsFillVolumeDownFill className='volume' onClick={()=>setVolumeShow(!volumeShow)} />
            {volumeShow &&   <input ref={input} type='range' min="0" max='1' step="0.1" onChange={changeVolume} /> }
          
        </div>
    )
}

export default Controlls