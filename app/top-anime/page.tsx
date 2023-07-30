"use client"

import React, { useEffect } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import useSWRInfinite from "swr/infinite"
import { FaStar } from 'react-icons/fa'
import { Metadata } from 'next'

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type TopAnime = {
    pagination: { has_next_page: Boolean }
}[]


export const metadata: Metadata = {
  title: 'Top Anime',
  description: 'Top Anime of All time!',
}

export default function TopAnime() {
    const { 
        data,
        size,
        setSize,
        isValidating,
        isLoading
     } = useSWRInfinite((index) => 
        `https://api.jikan.moe/v4/top/anime?page=${index + 1}`,
        fetcher
    )

    const topAnimeData: TopAnime = data ? [].concat(...data) : [];
    const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const pageEnd = topAnimeData[topAnimeData.length - 1]?.pagination?.has_next_page ? true : false
    
  return (
    <div className={styles.topAnimeContainer}>
        <p className={styles.topAnimeTitle}>Top Anime Series</p>
      

      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Title</th>
              <th>Score</th>
            </tr>
          </thead>
          {/* <FaStar color="rgb(216 255 0 / 91%)" size="1.3rem"  /> */}
          <tbody>

            {isLoading ? null : 
                topAnimeData.map((page: any, id: number) => (
                <React.Fragment key={id}>
                    {page?.data?.map((anime: any, id: number) => (
                    <tr key={id}>
                        <td>
                        <p className={styles.rank}>{anime?.rank}</p>  
                        </td>
                        <td>
                        <div className={styles.animeTitleWrapper}>
                            <div className={styles.animeImgWrapper}>
                            <img src={anime?.images?.jpg?.image_url} alt="poster" />
                            </div>
                            <div className={styles.animeDescriptionWrapper}>
                            <Link href={`/anime/${anime?.mal_id}`}>{anime?.title}</Link>
                            <p>{anime?.type} ({anime?.episodes} eps)</p>
                            <p>{anime?.aired?.string}</p>
                            </div>
                        </div>
                        </td>
                        <td>
                        <div className={styles.score}>
                            <FaStar color="rgb(216 255 0 / 91%)" size="1.3rem"  />
                            <p>{anime?.score}</p>
                        </div>
                        </td>
                    </tr>
                    ))}
                </React.Fragment>
            ))}
          </tbody>

        </table>
        {isLoading &&
              <div className={styles.loaderContainer}>
               <p>Fetching anime...</p>
              </div>  
            }
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
  )
}
