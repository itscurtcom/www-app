import React from 'react';
import PropTypes from 'prop-types';
import { Link, } from 'react-router-dom';

import IconListItem from '../IconListItem';

import './ArticleSummary.css';

const ArticleSummary = ({ id, url, title, images, summary, event, date, location, }) => (
  <div className='article-summary'>
    <div className='row'>
      <div className='col-md-offset-1 col-md-3 no-min-height'>
        <Link to={url}>
          <img className='article-summary__thumbnail' src={images.thumbnail.url} alt={images.thumbnail.description} title={images.thumbnail.title} />
        </Link>
      </div>
      <div className='col-md-5 no-min-height'>
        <h2 className='article-summary__title'><Link className='article-summary__title__link' to={url}>{title}</Link></h2>
        <div className='article-summary__body' dangerouslySetInnerHTML={{__html: summary,}} />
        <ul className='article-summary__details'>
          {
            event ? (
              <IconListItem id='event' icon='fa-group' text={event.text} url={event.url} />
            ) : null
          }
          {
            date ? (
              <IconListItem id='date' icon='fa-calendar' text={date.toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', })} />
            ) : null
          }
          {
            location ? (
              <IconListItem id='location' icon='fa-location-arrow' text={location} />
            ) : null
          }
        </ul>
      </div>
    </div>
  </div>
);

ArticleSummary.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  event: PropTypes.object,
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  location: PropTypes.string,
};


export default ArticleSummary;
