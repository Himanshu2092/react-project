/**
 *
 * Create
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCreate from './selectors';
import reducer from './reducer';
import saga from './saga';

import HocHeader from '../../components/HocHeader';
import CreateQuestion from './Components/CreateQuestion';
import QuestionCreated from './Components/QuestionCreated';

/* eslint-disable react/prefer-stateless-function */
export class Create extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Create</title>
          <meta name="description" content="Description of Create" />
        </Helmet>
        <CreateQuestion />
        <QuestionCreated />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  create: makeSelectCreate(),
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

const withReducer = injectReducer({ key: 'create', reducer });
const withSaga = injectSaga({ key: 'create', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HocHeader(Create, '1'));
