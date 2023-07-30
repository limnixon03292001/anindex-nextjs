import { HiArrowSmUp } from 'react-icons/hi';
import { BsChevronRight } from 'react-icons/bs';
import styles from './SliderButton.module.css';

export const SampleNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div className={styles.bgNext}>
            <span onClick={onClick} className={styles.nextArrow}> 
                <BsChevronRight size={31}/>
            </span>
        </div>
    );
}
  
export const SamplePrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div className={styles.bgPrev}>
            <span onClick={onClick} className={styles.prevArrow}> 
                <BsChevronRight size={31}/> 
            </span>
        </div>
    );
}

