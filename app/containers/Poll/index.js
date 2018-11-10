/**
 *
 * Poll
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPoll from './selectors';
import reducer from './reducer';
import saga from './saga';

import HocHeader from '../../components/HocHeader';
import PollAnswer from './Component/PollAnswer';

/* eslint-disable react/prefer-stateless-function */
export class Poll extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Poll</title>
          <meta name="description" content="Description of Poll" />
        </Helmet>
        <PollAnswer />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  poll: makeSelectPoll(),
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

const withReducer = injectReducer({ key: 'poll', reducer });
const withSaga = injectSaga({ key: 'poll', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HocHeader(Poll, '2'));
