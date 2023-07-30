"use client"

import styles from './RecommendationSlider.module.css'
import Link from "next/link"
import { settings2 } from "@/utils/SliderSettings"
import Slider from 'react-slick/lib/slider'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"


export default function RecommendationSlider( { data } : { data: any } ) {
 

  return (
    <div className={styles.recommendationWrapper}>
        <p className={styles.titleRecommedation}>Recommendations</p>   

        { data?.length === 0 ? 
            <p className={styles.norecommendationText}>No recommendations found.</p>   
            :
            <Slider {...settings2} className={styles.slider}>
                {
                    data?.map((recommendation: {
                      entry: { 
                        mal_id: string,
                        images: { jpg: { image_url: string } },
                        title: string
                      }
                    }, id: string) => (
                        
                        <Link href={`/anime/${recommendation?.entry?.mal_id}`}  key={id} className={styles.linkWrappers}>
                            <div className={styles.card}>
                                <img src={recommendation?.entry?.images?.jpg?.image_url} alt="poster" className={styles.imgRecommendation} />
                                <p>{recommendation?.entry?.title}</p>
                            </div>
                        </Link>
                        
                    ))
                }
            </Slider>
        }
    </div>
  )
}
