"use client"

import { ChangeEvent, useEffect, useState } from 'react'
import './SearchbarHero.css'
import Link from 'next/link'
import { DebounceInput } from 'react-debounce-input'
import { FaSearch } from 'react-icons/fa'

export default function SearchbarHero() {
    const [data, setData] = useState([])
    const [isFetching, setIsFetching ] = useState(false)
    const [searchData, setSearchData ] = useState('')

    const onChangeFetcher = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault

        const fetcher = async () => {
            setSearchData(e.target.value)
          
            setIsFetching(true)
            const res = await fetch(`https://api.jikan.moe/v4/anime?q=${searchData}&order_by=rank`)
            const { data } = await res.json()
            console.log("d", data);
            setData(data)
            setIsFetching(false)
        }
        fetcher()
    }

    useEffect(() => {
        const openSearchResult = (event: any) => {
           if (event.target.id !== 'searchWrapper') {
            setSearchData('') 
            setData([])
        }
            
        };
    
        window.addEventListener('click', openSearchResult);
    
        return () => window.removeEventListener('click', openSearchResult);
    }, []);
    
  return (
    <div className="searchHero">
        <form>
            <div className="searchInner">
                <div className="searchMainInner">
                    <DebounceInput
                        minLength={2}
                        debounceTimeout={300}
                        value={searchData}
                        onChange={onChangeFetcher} 
                        placeholder="Search anime..." 
                        id="searchWrapper"
                    />
                    {/* onInput={inputs} style={inputStyle} */}
                    {/* <Link> */}
                        <button type="submit" className="searchIcon">
                          <FaSearch size="1rem"/>
                        </button>
                    {/* </Link>  */}
                </div>
                {/* Searched Anime */}
                <div className="searchAnimeWrapper" id="searchWrapper">
                    { isFetching ? 
                        <div className="loadingWrapper">
                          <p>Searching anime</p>
                        </div>
                    :

                        data?.map((anime: any, id: number) => (
                            <Link href={`/anime/${anime?.mal_id}`} key={id} className="animeLink">
                                <div className="searchAnime">
                                    <div className="imgContainer">
                                        <img src={anime?.images?.jpg?.image_url} alt="poster" />
                                    </div>
                                    <div>
                                        <p>{anime?.title}</p>
                                        {anime?.year && <p className="yearText">{anime?.year}</p> }
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                {/* Searched Anime */}
            </div>
        </form>
    </div>
  )
}
