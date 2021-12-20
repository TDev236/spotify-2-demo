import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon,
    LockClosedIcon,
} from '@heroicons/react/outline';
import { signOut, useSession} from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';



function Sidebar() {

    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState([]);// funcion async para obtener playlist getPlaylists()
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
    
    console.log("Escogiste una playlist>>>", playlistId);
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
            }
        }, [session, spotifyApi]);
        console.log(playlists)

    return (
        <div className='text-gray-500 p-5 
            text-xs
            lg:text-xm 
            border-r 
            border-gray-900 
            overflow-y-scroll 
            h-screen 
            scrollbar-hide
            h-screen
            sm:max-w-[12rem]
            lg:max-w-[15rem]
            hidden
            md:inline-flex
            pb-8
            '

        >
            <div className='space-y-4'>
                <button className='flex items-center space-x-2 hover:text-white'
                    onClick={()=> signOut()}
                >
                    <LockClosedIcon className="h-5 w-5"/>
                    <p>Salir</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HomeIcon className="h-5 w-5"/>
                    <p>Home</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <SearchIcon className="h-5 w-5"/>
                    <p>Buscar</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <LibraryIcon className="h-5 w-5"/>
                    <p>Tu Biblioteca</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900'/>

                <button className='flex items-center space-x-2 hover:text-white'>
                    <PlusCircleIcon className="h-5 w-5"/>
                    <p>Crear Playlist</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HeartIcon className="h-5 w-5"/>
                    <p>Canciones Amadas</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <RssIcon className="h-5 w-5"/>
                    <p>Tus Episodios</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900'/>
                
                {/* Playlist */}
                {playlists.map((playlist) => (
                    <p key={playlist.id} onClick={() =>setPlaylistId(playlist.id)} className='cursor-pointer hover:text-white text-bold'>
                        {playlist.name}
                    </p>
                ))}
                
                
            </div>
        </div>
    )
}

export default Sidebar
