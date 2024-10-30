import React from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import styles from "./CardItem.module.css"

type CardItemProps = {
  fetching: boolean;
};

const CardItem = ({ fetching }: CardItemProps) => {
  if (fetching) {
    return (
      <div className={styles.spinner}>
        <RefreshIcon />
      </div>)
  }
  return null
}

export default CardItem;
