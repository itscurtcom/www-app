import React from 'react';
import PropTypes from 'prop-types';
import { Link, } from 'react-router-dom';
import IconListItem from '../common/IconListItem';

import './ArticleList.css';

const ArticleList = ({ articles, loading, error, }) => (
  <div className='article-list'>
    {
      (() => {
        if (error) {
          return (
            <div className='row'>
              <div className='col-md-offset-1 col-md-8'>
                <div className='article-list__error'>
                  <i className='fa fa-exclamation-triangle article-list__error__icon' aria-hidden='true'></i>
                  <span className='article-list__error__text'>Error loading articles</span>
                </div>
              </div>
            </div>
          );
        } else if (loading) {
          return (
            <div className='row'>
              <div className='col-md-offset-1 col-md-8'>
                <div className='article-list__loading'>
                  <span className='article-list__loading__text'>Loading articles…</span>
                  <i className='fa fa-spinner fa-spin article-list__loading__icon' aria-hidden='true'></i>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            articles.map(article => {
              return (
                <div key={article.id} className='article-list__article'>
                  <div className='row'>
                    <div className='col-md-offset-1 col-md-3 no-min-height'>
                      <Link to={article.url}>
                        <img className='article-list__article__thumbnail' src={article.images.thumbnail.url} alt={article.images.thumbnail.description} title={article.images.thumbnail.title} />
                      </Link>
                    </div>
                    <div className='col-md-5 no-min-height'>
                      <h2 className='article-list__article__title'><Link to={article.url}>{article.title}</Link></h2>
                      <div className='article-list__article__summary' dangerouslySetInnerHTML={{__html: article.summary,}} />
                      <ul className='featured-article__details'>
                        {
                          article.event ? (
                            <IconListItem id='event' icon='fa-group' text={article.event.text} url={article.event.url} />
                          ) : null
                        }
                        {
                          article.date ? (
                            <IconListItem id='date' icon='fa-calendar' text={article.date.toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', })} />
                          ) : null
                        }
                        {
                          article.location ? (
                            <IconListItem id='location' icon='fa-location-arrow' text={article.location} />
                          ) : null
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })
          );
        }
      })()
    }
  </div>
);

ArticleList.propTypes = {
  articles: PropTypes.array,
  error: PropTypes.object,
  loading: PropTypes.bool,
};


export default ArticleList;
