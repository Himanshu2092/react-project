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
    this.state = {
      data: [],
      selectedAnswer: '',
    };
  }

  createData = (id, obj) => {
    const { data } = this.state;
    data.push({ id, ...obj });
    this.setState({
      data,
    });
  };

  componentDidMount() {
    const db = firebase.firestore();
    const self = this;
    db.collection('questions')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const obj = doc.data() || {};
          self.createData(doc.id, obj);
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());
        });
      });
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
    this.setState({
      selectedAnswer: e.target.value,
    });
  };

  renderAnswers = answerChoices => {
    const tempArray = answerChoices.map((answer, index) => {
      const value = `value${index}`;
      const option = String.fromCharCode(65 + index);
      return (
        <RadioButton value={value}>
          <Tag className="tagstyle">{option}</Tag>
          {answer}
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
