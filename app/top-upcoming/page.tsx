"use client"

import React from 'react'
import styles from './page.module.css'
import useSWRInfinite from "swr/infinite"
import Link from 'next/link';


const fetcher = (url: string) => fetch(url).then((res) => res.json());

type TopUpcomingAnime = {
    pagination: { has_next_page: Boolean }
}[]

export default function TopUpcoming() {
    
    const { 
        data,
        size,
        setSize,
        isValidating,
        isLoading
     } = useSWRInfinite((index) => 
        `https://api.jikan.moe/v4/seasons/upcoming?page=${index + 1}`,
        fetcher
    )

    const topUpcomingAnimeData: TopUpcomingAnime = data ? [].concat(...data) : [];
    const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const pageEnd = topUpcomingAnimeData[topUpcomingAnimeData.length - 1]?.pagination?.has_next_page ? true : false

  return (
    <div className={styles.topUpcomingContainer}>
        <p className={styles.topUpcomingTitle}>Top Upcoming Anime</p>
      
        {isLoading ? 
        <div className={styles.loaderContainer}>
            <p>Fetching anime...</p>
        </div> 
        :
        <div className={styles.searchAnimeGridContainer}> 
            {topUpcomingAnimeData.map((page: any, id: number) => (
            <React.Fragment key={id}>
                {page?.data?.map((anime: any, id: number) => (
                <Link href={`/anime/${anime?.mal_id}`} key={id}>
                    <div className={styles.imgContainer}>
                    <img src={anime?.images?.jpg?.image_url} alt="poster" />
                    </div>
                    <p className={styles.animeTitle}>{anime?.title}</p>
                </Link>
                ))}
            </React.Fragment>
            ))}
        </div>
        }  
    

        <div className={styles.btnContainer}>
            {isLoading ?  
                <div className={styles.loaderContainer}>
                    <p>Fetching anime...</p>
                </div>  
            :
            pageEnd &&
                <button 
                    onClick={() => setSize(size + 1)}
                    type='button' 
                    className={styles.btnLoadMore}
                >
                    Load more.
                </button>
            }
         </div>

    </div>
  )
}
