import Banner from './Banner';
import MainView from './MainView';
import React, {useEffect} from 'react';
import Tags from './Tags';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes';

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED })
});


const Home = props => {

  useEffect(() => {
    const tab = props.token ? 'feed' : 'all';
    const articlesPromise = props.token ?
        agent.Articles.feed :
        agent.Articles.all;

    props.onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
    return () => {
      props.onUnload();
    }
  },[])

  return (
      <div className="home-page">

        <Banner token={props.token} appName={props.appName} />

        <div className="container page">
          <div className="row">
            <MainView />
            <div className="sidebar">
              <p>Популярные теги</p>
              <Tags
                  tags={props.tags}
                  onClickTag={props.onClickTag} />
            </div>
          </div>
        </div>

      </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
