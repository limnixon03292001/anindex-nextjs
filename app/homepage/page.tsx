
import styles from './page.module.css'
import cover from '@/imgs/cover.jpg'
import SearchbarHero from '@/components/SearchbarHero/SearchbarHero'
import { Suspense } from 'react'
import TopSlider from '@/components/Sliders/TopSlider/TopSlider'
import { fetchSeasonNow, fetchSeasonUpcoming, fetchTopAnime } from '@/lib/apiCalls'
import Skeleton from '@/components/Skeleton/Skeleton'


export default async function Homepage() {
   
  const topAnime = await fetchTopAnime()
  const seasonAnime = await fetchSeasonNow()
  const animeUpcoming = await fetchSeasonUpcoming()

  // https://api.jikan.moe/v4/anime?q=aot
  
  return (
    <div className={styles.hero}>
        <div className={styles.heroImg} style={{backgroundImage: `url(${cover.src})`}}>

            <div className={styles.heroContent}>
                <p className={styles.welcomeText}>Welcome to Ani<span>NDEX</span></p>
                <p>Search your Favorite Anime!</p>
                <p>Developed by Nixon Lim powered by Jikan Api</p>

                {/* SearchBar */}
                <SearchbarHero/>
                {/* SearchBar */}
            </div>
            

            {/* Top's section Anime */}
            <Suspense fallback={<Skeleton/>}>
              <TopSlider data={seasonAnime} title='Season Now' link='/season-now'/>
            </Suspense>
            <Suspense fallback={<Skeleton/>}>
              <TopSlider data={topAnime} title='Top Anime' link='/top-anime'/>
            </Suspense>
            <Suspense fallback={<Skeleton/>}>
              <TopSlider data={animeUpcoming} title='Top Upcoming Anime' link='/top-upcoming'/>
            </Suspense>
            {/* Top's section Anime */}
            
        </div>
     </div>      
  )
}


