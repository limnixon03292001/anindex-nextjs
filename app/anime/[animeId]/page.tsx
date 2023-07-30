 import styles from './page.module.css' 
import { FaStar,FaHeart } from 'react-icons/fa'
import { fetchAnimeCharacters, fetchAnimeDetails, fetchAnimeRecommendations } from '@/lib/apiCalls'
import Image from 'next/image'
import Trailer from '@/components/Trailer/Trailer'
import RecommendationSlider from '@/components/RecommendationSlider/RecommendationSlider'




export default async function Anime({ params } : { params: { animeId: string }}) {
 
    const { data: details } = await fetchAnimeDetails(params.animeId)

    const { data: characters} = await fetchAnimeCharacters(params.animeId)

    const { data: recommendations } = await fetchAnimeRecommendations(params.animeId)
 
  return (
    <div>
        <div className={styles.firstLayerWrapper}>
        <div className={styles.background} style={{backgroundImage: `url(${details?.images?.jpg?.image_url})`}}/>

        <div className={styles.firstLayer}>
            <div className={styles.imageWrapper}>
            <Image
                className={styles.posterImg}
                src={details?.images?.jpg?.image_url}
                alt={details?.title + "poster"}
                width={200}
                height={200}
            />
            </div>

            <div>
            <div>
                <p className={styles.popularity}>Popularity #{details?.popularity}</p>
                <h2 className={styles.title}>{details?.title}</h2>
                <p className={styles.titleJapanese}>{details?.title_japanese}</p>
                <p className={styles.synopsis}>{details?.synopsis}</p>
            </div>
            </div>
        </div>
        </div>

        <div className={styles.secondLayer}>
        <div className={styles.secondLayerGrid}>
        <div className={styles.secondLayerLeftSide}>
            <div className={styles.score}>
            <FaStar color="rgb(216 255 0 / 91%)" size="1.3rem"  />
            <p> Score: {details?.score}</p>
            </div>

            <div className={styles.ranked}>
                <FaHeart color="#de3838" size="1.3rem"  />
                <p>Ranked #{details?.rank} </p>
            </div>

            <div className={styles.moreDetails}>
            <ul className={styles.outer_list}>
                <li>
                <p>Genre</p>
                {details?.genres.map((genre: { name: string }, id: number) => (
                    <span key={id}>{genre?.name}, </span>
                ))}
                </li>
                <li>
                <p>Source</p>
                <span>{details?.source}</span>
                </li>
                <li>
                <p>Format</p>
                <span>{details?.type}</span>
                </li>
                <li>
                <p>Season</p>
                <span>{details?.season}</span>
                </li>
                <li>
                <p>Episodes</p>
                <span>{details?.episodes}</span>
                </li>
                <li>
                <p>Episodes Duration</p>
                <span>{details?.duration}</span>
                </li>
                <li>
                <p>Aired on</p>
                <span>{details?.aired?.string}</span>
                </li>
                <li>
                <p>Status</p>
                <span>{details?.status}</span>
                </li>
                <li>
                <p>Memebers</p>
                <span>{details?.members}</span>
                </li>
                <li>
                <p>Favorites</p>
                <span>{details?.favorites}</span>
                </li>
            </ul>
            </div>
        </div>

        
        <div className={styles.secondLayerRightSide}>
            {/* Characters & Voice Actors */}
            <div className={styles.charactersActorWrapper}>
            <p>Characters & Voice Actors</p>
            <div className={styles?.gridCharacters}>
                {characters?.slice(0,6).map((characters: {
                character: {
                    name: string,
                    images: {
                        jpg: {
                            image_url: string
                        }
                    }
                },
                voice_actors: [
                    { 
                        person: { name: string, images: { jpg: { image_url: string } } }, 
                        language: string,
                    }
                ],
                
                role: string
                },id: number) => (
                <div className={styles.charactersCard} key={id}>

                    <div className={styles.characterActor} >
                    <div className={styles.character}>
                        <div className={styles?.characterActorImg} style={{backgroundImage: `url(${characters?.character?.images?.jpg?.image_url})`}}/>
                        <div className={styles.nameRole}>
                        <p>{characters?.character?.name}</p>
                        <p>{characters?.role}</p>
                        </div>
                    </div>

                    <div className={styles.actor}>
                        <div className={styles.nameRole}>
                        <p>{characters?.voice_actors[0]?.person?.name}</p>
                        <p>{characters?.voice_actors[0]?.language}</p>
                        </div>
                        <div className={styles?.characterActorImg} style={{backgroundImage: `url(${characters?.voice_actors[0]?.person?.images?.jpg?.image_url})`}}/> 
                        
                    </div>
                    </div>
                    
                </div>
                ))}
            </div>
            </div>
        
            {/* Characters & Voice Actors */}
            <div>
            {/* Opening Themes */}
                <p>Opening Themes</p>   
                <div className={styles.themesGrid}>
                    {details?.theme?.openings.map((opening: string, id: number) => (
                    <div className={styles.themesItem} key={id}>
                        <p>{opening}</p>
                    </div>
                    ))}
                </div>
            {/* Opening Themes */}   

            {/* Ending Themes */}
            <p>Ending Themes</p>   
            <div className={styles.themesGrid}>
                {details?.theme?.endings.map((ending: string, id: number) => (
                    <div className={styles.themesItem} key={id}>
                    <p>{ending}</p>
                    </div>
                ))}
            </div>
            {/* Ending Themes*/}
            </div>
            
            {/* Trailer */}
            <Trailer trailerId={details?.trailer?.youtube_id}/>
            {/* Trailer */}


        </div>
        
        </div>
        </div>

        <div className={styles.recommendationMainWrapper}>
            <RecommendationSlider data={recommendations}/>
        </div>
    </div>
  )
}

export async function generateMetadata({ params } : { params: { animeId: string }}) {
    const { data: details } = await fetchAnimeDetails(params?.animeId)

    return {
        title: details?.title,
        description: details?.synopsis,
        siteName: 'Anindex',
    }
}
