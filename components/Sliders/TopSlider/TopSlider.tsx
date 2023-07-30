'use client'

import Link from "next/link";
import styles from './TopSlider.module.css'
import Slider from 'react-slick/lib/slider'
import { settings1 } from "@/utils/SliderSettings"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Image from "next/image";

export default function TopSlider({ data, title, link }: any) {
 
  return (
    <div>
        <div className={styles.header}>
            <h1 className={styles.topAnimeText}>{title}</h1>
            <Link href={link}>View all</Link>
        </div>
        {/* {loading ?
            <div className={styles.loaderContainer}>
            <Loader/> <p>Fetching {title}...</p>
        </div> 
        : */}
            <Slider {...settings1} className={styles.slider}>
                {
                    data?.data?.map((anime: any, id: number) => (
                        <Link href={`/anime/${anime?.mal_id}`} key={id} className={styles.linkWrapper}>
                            <div className={styles.card}>
                                <Image
                                    className={styles.imgTops}
                                    src={anime?.images?.jpg?.image_url}
                                    alt={anime?.title + "poster"}
                                    width={200}
                                    height={200}
                                />
                                <p>{anime?.title}</p>
                            </div>
                        </Link> 
                    ))
                }
            </Slider>
        {/* } */}
    </div>
  )
}
