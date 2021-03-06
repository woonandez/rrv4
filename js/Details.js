// @flow

import React from 'react';
import { connect } from 'react-redux';
import getApiDetails from './asyncActions';
import Header from './Header';
import Spinner from './Spinner';

class Details extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.rating) {
      this.props.getApiData();
    }
  }

  render() {
    const { title, description, year, poster, trailer } = this.props.show;
    let ratingComponent;
    if (this.props.rating) {
      ratingComponent = <h3>{this.props.rating}</h3>;
    } else {
      ratingComponent = <Spinner/>
    }

    return (
      <div className="details">
        <Header />
        <h1>svideo</h1>
        <section>
          <h1>{title}</h1>
          <h2>{(year)}</h2>
          {ratingComponent}
          <img src={`/img/posters/${poster}`} alt={`Poster for ${title}`} />
          <p>{description}</p>
        </section>
        <div>
          <iframe src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&amp; controls=0&amp;showinfo=0`}
            frameBorder="0"
            allowFullScreen
            title={`Trailer for ${title}`} />
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  const apiData = state.apiData[ownProps.show.imdbID] ? state.apiData[ownProps.show.imdbID] : { apiData: '' };
  return {
    rating: apiData.rating
  }
}

const mapDispatchToProps = (dispatch: Function, ownProps) => ({
  getApiData() {
    dispatch(getApiDetails(ownProps.show.imdbID));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);