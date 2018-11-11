/**
 *
 * PollAnswer
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';

import '../styles.css';
import { Card, Radio, Tag } from 'antd';
import { firebase } from '../../../config';

const { Meta } = Card;

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
/*
 eslint-disable react/prefer-stateless-function */
export default class PollAnswer extends React.Component {
  constructor(props) {
    super(props);
    const { storeData } = this.props;
    this.state = {
      data: storeData.questionDetails,
      selectedAnswer: '',
    };
  }

  componentDidMount() {
    const { storeData, save } = this.props;
    if (storeData.questionDetails.length > 0) {
      this.setState({
        data: storeData.questionDetails,
      });
    } else {
      const db = firebase.firestore();
      db.settings({
        timestampsInSnapshots: true,
      });

      let questData = [];
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

            questData.push(questObj);
          });
          save(questData, 'add');
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { storeData } = this.props;
    if (storeData.questionDetails != nextProps.storeData.questionDetails) {
      if (nextProps.storeData.questionDetails.length > 0) {
        this.setState({
          data: nextProps.storeData.questionDetails,
        });
      }
    }
  }

  renderQuestions = () => {
    const { data } = this.state;
    return data.map((quest, index) => (
      <Card actions={[this.renderAnswers(quest.answer_choices)]}>
        <Meta title={quest.question_title} description={quest.question} />
      </Card>
    ));
  };

  onChange = e => {
    const { storeData, save } = this.props;
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true,
    });
    if (storeData.questionDetails.length > 0) {
      const questRef = db
        .collection('questions')
        .doc(
          storeData.questionDetails[0] ? storeData.questionDetails[0].id : '1',
        );

      questRef.get().then(snapshot => {
        if (snapshot.exists) {
          let value = +e.target.value;

          let selectedIndex = storeData.questionDetails[0].answer_choices.findIndex(
            x => x.key == value,
          );
          if (selectedIndex != -1) {
            storeData.questionDetails[0].answer_choices[
              selectedIndex
            ].answered.push('user1');
          }

          questRef.update({ ...storeData.questionDetails[0] }).then(() => {
            let questData = [];
            questData.push(storeData.questionDetails[0]);
            save(questData, 'delete');
          });
        }
      });
    }

    this.setState({
      selectedAnswer: e.target.value,
    });
  };

  renderAnswers = answerChoices => {
    const tempArray = answerChoices.map((answer, index) => {
      const value = `${index + 1}`;
      const option = String.fromCharCode(65 + index);
      return (
        <RadioButton value={value}>
          <Tag className="tagstyle">{option}</Tag>
          {answer.choice}
        </RadioButton>
      );
    });
    const radioArray = (
      <RadioGroup
        defaultValue={this.state.selectedAnswer}
        size="large"
        buttonStyle="solid"
        onChange={this.onChange}
      >
        {tempArray}
      </RadioGroup>
    );

    return radioArray;
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <Helmet>
          <title>PollAnswer</title>
          <meta name="description" content="Description of PollAnswer" />
        </Helmet>
        {this.renderQuestions()}
      </div>
    );
  }
}
