import React from 'react';
import styles from './sendMessage.module.css';

export const SendMessage = ({type, message}) => {

    if(type == 'error'){
        return(
            <div className={styles.error}>
                <p>{message}</p>
            </div>
        );
    }
    if(type == 'success'){
        return(
            <div className={styles.success}>
                <p>{message}</p>
            </div>
        );
    }
}