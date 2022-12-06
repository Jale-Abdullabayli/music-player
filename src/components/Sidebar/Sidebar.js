import React from 'react'
import './Sidebar.scss';

function Sidebar({ musics,changeActive,sidebarShow }) {
    return (
        <div  className = {`${sidebarShow && 'show'} sidebar`}>
            <h2>Library</h2>
            {musics.map((music,index) => {
                return (
                    <div onClick={()=>changeActive(index)} key={music.id} className={`${music.active && 'active'} music`}>
                        <img src={music.cover} alt='cover'/>
                        <div className='content'>
                            <h4>{music.name}</h4>
                            <h6>{music.artist}</h6>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Sidebar