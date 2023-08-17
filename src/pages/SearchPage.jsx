import { useEffect, useState } from "react";
import { Search } from "../components/Search"
import { Songs } from "../components/Songs"
import { getSongs } from "../services/api-client";
import { Player } from "../components/Player";

export const SearchPage=()=>{
    const [allSongs,setSongs]=useState([])
    const[flag,setFlag]=useState(false)
    const [song,setSong]=useState(null)
    const togglePlayer=(flag,songarg)=>{
        setSong(songarg)
        setFlag(flag)
    }
    const loadSongs=async ()=>{
        setSongs(await getSongs('Latest Songs'))
    }
    useEffect(()=>{
        loadSongs()
    },[])
    const getArtistName=async(ArtistName)=>{
        console.log('Rec artist name: ',ArtistName);
        setSongs(await getSongs(ArtistName))
    }
    const jsx=<>
    <Search fn={getArtistName}/>
        <Songs fn={togglePlayer} allsongs={allSongs}/>
    </>
    return(<div className="container">
        <h1 className="alert alert-info text-center">MUSIC STORE</h1>
        {/* <Player/> */}
        {flag?<Player fn={togglePlayer} song={song}/>:jsx}
        </div>)
}