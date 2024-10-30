import React from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import styles from "./Spinner.module.css"

type SpinnerProps = {
  fetching: boolean;
};

const Spinner = ({ fetching }: SpinnerProps) => {
  if (fetching) {
    return (
      <div className={styles.spinner}>
        <RefreshIcon />
      </div>)
  }
  return null
}

export default Spinner;
