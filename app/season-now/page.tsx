"use client"

import React from 'react'
import useSWRInfinite from "swr/infinite"
import styles from './page.module.css'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type SeasonNowAnime = {
     pagination: { has_next_page: Boolean }
}[]

export default function SeasonNowPage() {
    
    const { 
        data,
        size,
        setSize,
        isValidating,
        isLoading
     } = useSWRInfinite((index) => 
        `https://api.jikan.moe/v4/seasons/now?page=${index + 1}`,
        fetcher
    )
 
     const seasonNowData: SeasonNowAnime = data ? [].concat(...data) : [];
     const isLoadingMore =
     isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
     const isEmpty = data?.[0]?.length === 0;
     const pageEnd = seasonNowData[seasonNowData.length - 1]?.pagination?.has_next_page ? true : false

  return (
    <>
        <div>
            <div className={styles.seasonNowContainer}>
                <p className={styles.seasonTitle}>Season Now</p>
                <div className={styles.searchAnimeGridContainer}> 
                    {seasonNowData.map((page: any, id: number) => (
                    <React.Fragment key={id}>
                        {page?.data?.map((anime: {
                            mal_id: string,
                            images: { jpg: { image_url: string } },
                            title: string
                        }, id: number) => (
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
        </div>
    </>
  )
}
