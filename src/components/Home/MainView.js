import ArticleList from '../ArticleList';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';

import styles from '../../styles/Home.module.scss';

const YourFeedTab = props => {
  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault();
      props.onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
    }

    return (
        <a href="/"
            className={ props.tab === 'feed' ? styles.active : '' }
            onClick={clickHandler}>
          Ваша лента
        </a>
    );
  }
  return null;
};

const GlobalFeedTab = props => {
  const clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick('all', agent.Articles.all, agent.Articles.all());
  };
  return (
      <a
        href="/"
        className={ props.tab === 'all' ? styles.active : '' }
        onClick={clickHandler}>
        Лента
      </a>
  );
};

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
      <a href="/" className={styles.active}>
        <i className="ion-pound"></i> {props.tag}
      </a>
  );
};

const mapStateToProps = state => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});

const MainView = props => {
  return (
    <div className="content">
      <div className={styles.feed_nav}>

          <YourFeedTab
              token={props.token}
              tab={props.tab}
              onTabClick={props.onTabClick} />

          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

          <TagFilterTab tag={props.tag} />

      </div>

      <ArticleList
          pager={props.pager}
          articles={props.articles}
          loading={props.loading}
          articlesCount={props.articlesCount}
          currentPage={props.currentPage} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
