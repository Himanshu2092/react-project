import React from 'react';

import '../styles.css';

import { Card, Icon } from 'antd';

const { Meta } = Card;

export default class QuestionCreated extends React.Component {
  render() {
    return (
      <div>
        <Card
          style={{ width: 300, marginTop: 16 }}
          actions={[<Icon type="edit" />, <Icon type="delete" />]}
        >
          <Meta title="Card title" description="This is the description" />
        </Card>
      </div>
    );
  }
}
