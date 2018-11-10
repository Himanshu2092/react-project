/**
 *
 * PollAnswer
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';

import '../styles.css';
import { Card, Radio, Tag } from 'antd';

const { Meta } = Card;

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
/*
 eslint-disable react/prefer-stateless-function */
export default class PollAnswer extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>PollAnswer</title>
          <meta name="description" content="Description of PollAnswer" />
        </Helmet>
        <Card
          actions={[
            <RadioGroup defaultValue="" size="large" buttonStyle="solid">
              <RadioButton value="a">
                <Tag className="tagstyle">A</Tag>
                Answer1
              </RadioButton>
              <RadioButton value="b">
                <Tag className="tagstyle">B</Tag>
                Answer2
              </RadioButton>
              <RadioButton value="c">
                <Tag className="tagstyle">C</Tag>
                Answer3
              </RadioButton>
              <RadioButton value="d">
                <Tag className="tagstyle">D</Tag>
                Answer4
              </RadioButton>
            </RadioGroup>,
          ]}
        >
          <Meta title="Card title" description="This is the description" />
        </Card>
      </div>
    );
  }
}
