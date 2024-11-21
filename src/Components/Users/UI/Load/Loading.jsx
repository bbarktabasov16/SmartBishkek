import React from 'react'
import Css from './Loading.module.css'

function LoadingModal({width, height, color}) {
    return (
        <div className={Css.LoadingBlock} style={{width: width, height:height}}>
            <div className={Css.loader} style={{color:color}}>
                <span>{'{'}</span>
                <span>{'}'}</span>
            </div>
        </div>
    )
}

export default LoadingModal
