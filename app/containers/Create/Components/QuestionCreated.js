import React from 'react';

import '../styles.css';

import _ from 'underscore';
import { Card, Icon } from 'antd';
import { firebase } from '../../../config';

const { Meta } = Card;

export default class QuestionCreated extends React.Component {
  constructor(props) {
    super(props);

    const { storeData } = this.props;

    this.state = {
      data: storeData.questionDetails,
    };
  }

  onDelete = () => {
    const { storeData, action, save } = this.props;
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
          questRef
            .update({ ...storeData.questionDetails[0], delete: true })
            .then(() => {
              let questData = [];
              save(questData, 'delete');
              action(false);
            });
        }
      });
    }
  };

  render() {
    const { data } = this.state;
    const { action } = this.props;
    return (
      <div>
        {data.map(quest => (
          <Card
            style={{ width: 300, marginTop: 16 }}
            actions={[
              <Icon type="edit" onClick={() => action(false)} />,
              <Icon type="delete" onClick={() => this.onDelete()} />,
            ]}
          >
            <Meta title={quest.question_title} description={quest.question} />
          </Card>
        ))}
      </div>
    );
  }
}
