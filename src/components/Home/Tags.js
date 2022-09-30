import React from 'react';
import agent from '../../agent';
import styles from '../../styles/Tags.module.scss';

const Tags = props => {
  const tags = props.tags;

  if (tags) {
    return (
      <div className={styles.tags}>
        {
          tags.map(tag => {
            const handleClick = ev => {
              ev.preventDefault();
              props.onClickTag(tag, page => agent.Articles.byTag(tag, page), agent.Articles.byTag(tag));
            };

            return (
              <a
                href="/"
                className={styles.tag}
                key={tag}
                onClick={handleClick}>
                {tag}
              </a>
            );
          })
        }
      </div>
    );
  } else {
    return (
        <div className="loading">Загрузка тегов...</div>
    );
  }
};

export default Tags;
