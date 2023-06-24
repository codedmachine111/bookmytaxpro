import './ExpertCard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../Button/Button';

export const ExpertCard = (props) => {
    const { name, rating, services } = props;
    return(
        <>
            <div className="expert-card-container">
                <div className='expert-card-icon'>
                    <FontAwesomeIcon icon={faUser} id='expert-icon'/>
                </div>
                <div className='expert-card-details'>
                    <div className='expert-card-name'>{name}</div>
                    <div className='expert-card-rating'>Rating: {rating}</div>
                    <div className='expert-card-services'>Services: {services}</div>
                </div>
                <div className='expert-card-button'>
                    <Button title='Book Now' />
                </div>
            </div>
        </>
    )
}