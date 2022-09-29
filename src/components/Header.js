import React from 'react';
import { Link } from 'react-router-dom';
import { Icons, Avatar } from "./Library";

import styles from '../styles/Header.module.scss';

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
        <>
            <li className={styles.nav_item}>
              <Link to="/" className={styles.nav_link}>
                  <span><Icons type="home" /></span>
                  Главная
              </Link>
            </li>

            <li className={styles.nav_item}>
                <Link to="/login" className={styles.nav_link}>
                    <span><Icons type="login" /></span>
                    Войти
                </Link>
            </li>
        </>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
        <>
            <li className={styles.nav_item}>
                <Link to="/" className={styles.nav_link}>
                    <span><Icons type="home" /></span>
                    Главная
                </Link>
            </li>
            <li className={styles.nav_item}>
                <Link to="/editor" className={styles.nav_link}>
                    <span><Icons type="add" /></span>
                    Добавить пост
                </Link>
            </li>
            <li className={styles.nav_item}>
                <Link to="/settings" className={styles.nav_link}>
                    <span><Icons type="settings" /></span>
                    Настройки
                </Link>
            </li>
            <li className={styles.nav_item}>
                <Link to={`/@${props.currentUser.username}`} className={`${styles.nav_link} ${styles.avatar}`}>
                    <span><Avatar type="avatar1" /></span>
                    {props.currentUser.username}
                </Link>
            </li>
        </>
    );
  }

  return null;
};


const Header = (props) => {
    return (
        <nav className={styles.header}>
            <div className="container">
                <div className={styles.blocks}>
                    <Link to="/" className={styles.logo}>
                        {props.appName}
                    </Link>
                    <ul className={styles.nav}>
                        <LoggedOutView currentUser={props.currentUser} />
                        <LoggedInView currentUser={props.currentUser} />
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
