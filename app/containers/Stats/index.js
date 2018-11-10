/**
 *
 * Stats
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectStats from './selectors';
import reducer from './reducer';
import saga from './saga';

import HocHeader from '../../components/HocHeader';
import Statistics from './Component/Statistics';

/* eslint-disable react/prefer-stateless-function */
export class Stats extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Stats</title>
          <meta name="description" content="Description of Stats" />
        </Helmet>
        <Statistics />
      </div>
    );
  }
}

Stats.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  stats: makeSelectStats(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'stats', reducer });
const withSaga = injectSaga({ key: 'stats', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HocHeader(Stats, '3'));
