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
import { makeSelectStore } from '../App/selectors';
import * as actions from '../App/actions';
import reducer from '../App/reducer';
import config from '../App/config';

import HocHeader from '../../components/HocHeader';
import CreateQuestion from './Components/CreateQuestion';
import QuestionCreated from './Components/QuestionCreated';

import { firebase } from '../../config';

/* eslint-disable react/prefer-stateless-function */
export class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      created: false,
    };
  }

  componentDidMount() {
    const { storeData, save } = this.props;
    if (storeData.questionDetails.length == 0) {
      const db = firebase.firestore();
      db.settings({
        timestampsInSnapshots: true,
      });

      let tempArray = [];
      let questions = db
        .collection('questions')
        .where('delete', '==', 'false')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let questObj = {
              id: doc.id,
              ...doc.data(),
            };

            tempArray.push(questObj);
          });

          save(tempArray, 'add');
        });
    } else {
      this.setState({
        created: true,
      });
    }
  }

  handleAction = flag => {
    const { edit } = this.props;
    this.setState({
      created: flag,
    });
    edit(true);
  };

  componentWillReceiveProps(nextProps) {
    const { storeData } = this.props;

    if (nextProps.storeData.questionDetails.length == 0) {
      this.setState({
        created: false,
      });
    } else if (nextProps.storeData.isEdit) {
      this.setState({
        created: false,
      });
    } else {
      this.setState({
        created: true,
      });
    }
  }

  render() {
    const { created } = this.state;
    const { ...rest } = this.props;

    return (
      <div>
        <Helmet>
          <title>Create</title>
          <meta name="description" content="Description of Create" />
        </Helmet>
        {created ? (
          <QuestionCreated {...rest} action={this.handleAction} />
        ) : (
          <CreateQuestion {...rest} />
        )}
      </div>
    );
  }
}

// Create.propTypes = {
//   storeData: PropTypes.object,
//   save: PropTypes.func,
// };

const mapStateToProps = createStructuredSelector({
  storeData: makeSelectStore(),
});

function mapDispatchToProps(dispatch) {
  return {
    save: (value, type) => dispatch(actions.save(value, type)),
    edit: value => dispatch(actions.edit(value)),
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
)(HocHeader(Create, '1'));
