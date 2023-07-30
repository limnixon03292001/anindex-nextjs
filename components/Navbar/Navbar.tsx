import Link from "next/link";
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.header}>
      <div className={styles.headerCenterWrapper}>
        <Link href='/' >Ani<span>NDEX</span></Link>

        <div className={styles.searchBar}>
          
        <div className={styles.searchHero}>
                <div className={styles.searchInner}>
                    <div className={styles.searchMainInner} >
                        {/* <DebounceInput
                          minLength={2}
                          debounceTimeout={300}
                          value={searchData}
                          onChange={(e) => setSearchData(e.target.value)} 
                          placeholder="Search anime..." 
                          className={styles.inputSearch}
                          id="searchWrapper"
                        /> */}
                        {/* <Link> */}
                            <button type="submit" className={styles.searchIcon}>
                                {/* <FaSearch size="1rem"/> */}
                            </button>
                        {/* </Link>  */}
                    </div>
                    {/* Searched Anime */}
                    {/* <div className={styles.searchAnimeWrapper} id="searchWrapper">
                        { isFetching ? 
                            <div className={styles.loadingWrapper}>
                              <Loader/>  <p>Fetching anime {searchData}...</p>
                            </div>
                        :

                          data?.data?.data?.length === 0 ?
                            <div className={styles.loadingWrapper}>
                                    <p>Can't find Anime {searchData}</p>
                            </div>
                        :
                            data?.data?.data?.map((anime,id) => (
                                <Link to={`/anime/${anime?.mal_id}`} key={id} className={styles.animeLink}>
                                    <div className={styles.searchAnime}>
                                        <div className={styles.imgContainer}>
                                            <img src={anime?.images?.jpg?.image_url} alt="poster" />
                                        </div>
                                        <div>
                                            <p>{anime?.title}</p>
                                            {anime?.year && <p className={styles.yearText}>{anime?.year}</p> }
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div> */}
                    {/* Searched Anime */}
                </div>
          </div>

        </div>
      </div>
    </nav>
  )
}
