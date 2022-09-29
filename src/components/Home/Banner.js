import React from 'react';
import styles from '../../styles/Banner.module.scss';

const Banner = ({ appName, token }) => {
  if (token) {
    return null;
  }
  return (
    <div className={styles.banner}>
      <div className="container">
        <h1 className="logo-font">{appName}</h1>
        <h3>Место, где готовится новый опыт</h3>
      </div>
    </div>
  );
};

export default Banner;
