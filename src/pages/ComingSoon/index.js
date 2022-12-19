import React from 'react';
import './styles.css'

import playpodImg from '../../assets/play-pod-title.png'
import constructionImg from '../../assets/construction.png'

const ComingSoon = () => {
    return (
        <div className="coming-soon-container">
            <div className="titles-container">
                <img className="title-img" src={playpodImg}/>
                <h3 className="subtitle">Coming soon</h3>
            </div>
            <img className="construction-img" src={constructionImg}/>
            <h5 className="coming-soon-text">Website Coming Soon</h5>

        </div>
    )
}

export default ComingSoon
