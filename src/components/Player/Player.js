import React, { useRef, useState, useEffect } from 'react'
import './Player.scss'
import { BsMusicNoteBeamed } from 'react-icons/bs';
import Controlls from '../Controlls/Controlls';

function Player({ gradientWidth, setGradientWidth, timerSec, setTimerSec, activeMusic, sidebarShow, setSidebarShow, playing, setPlaying, audio, duration, max, changeActivePrev, changeActiveNext }) {
    let [timer, setTimer] = useState('0:00');
    let [intervalId, setIntervalId] = useState('');
    let input = useRef();
    let timerMin = 0;

    useEffect(() => {
        if (timerSec == audio?.duration) {
            clearInterval(intervalId);
            setPlaying(false)
        }
        setGradientWidth((100 / audio?.duration) * timerSec);
        timerMin = parseInt(timerSec / 60);
        setTimer(`${timerMin}:${('0' + (parseInt(timerSec) % 60)).slice(-2)}`);
    }, [timerSec]);

    function changeRange() {
        audio.currentTime = input.current.value;
        setTimerSec(input.current.value);
    }
    return (
        <div className='player'>
            <div className='title'>
                <h2>Waves</h2>
                <button onClick={() => setSidebarShow(!sidebarShow)} className={sidebarShow && 'show'} >Library <BsMusicNoteBeamed /></button>
            </div>
            <div className='content'>
                <img src={activeMusic.cover} className={playing ? 'playing' : ''} alt="cover" />
                <h2>{activeMusic.name}</h2>
                <h4 className='artist'>{activeMusic.artist}</h4>
                <div className='timer'>
                    <div className='timeStart'>{timer}</div>
                    <div className='range'>
                        <input ref={input} type='range' min="0" max={max} step="1" onChange={changeRange} />
                        <div className='inputGradient' style={{ backgroundImage: `linear-gradient(to right, ${activeMusic.color[0]} , ${activeMusic.color[1]})` }}>
                            <div className='inputGradientRight' style={{ width: `${100 - gradientWidth}%` }}></div>
                        </div>
                    </div>
                    <div className='timeEnd'>{duration}</div>
                </div>
                <Controlls
                    changeActiveNext={changeActiveNext}
                    audio={audio}
                    changeActivePrev={changeActivePrev}
                    setPlaying={setPlaying}
                    intervalId={intervalId}
                    setTimerSec={setTimerSec}
                    setIntervalId={setIntervalId}
                    playing={playing} />
            </div>
        </div>
    )
}

export default Player