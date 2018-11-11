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
import { makeSelectStore } from '../App/selectors';
import config from '../App/config';
import reducer from '../App/reducer';
import * as actions from '../App/actions';

import HocHeader from '../../components/HocHeader';
import PollAnswer from './Component/PollAnswer';
import { firebase } from '../../config';

/* eslint-disable react/prefer-stateless-function */
export class Poll extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { ...rest } = this.props;
    return (
      <div>
        <Helmet>
          <title>Poll</title>
          <meta name="description" content="Description of Poll" />
        </Helmet>
        <PollAnswer {...rest} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  poll: makeSelectPoll(),
  storeData: makeSelectStore(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    save: (value, type) => dispatch(actions.save(value, type)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: config.reducer.name, reducer });

export default compose(
  withReducer,
  withConnect,
)(HocHeader(Poll, '2'));
