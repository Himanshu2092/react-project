/**
 *
 * CreateFormForm
 *
 */

import React from 'react';

import '../styles.css';
import { Form, Input, Icon, Button } from 'antd';
import { firebase } from '../../../config';
const FormItem = Form.Item;

/* eslint-disable react/prefer-stateless-function */
class CreateQuestion extends React.Component {
  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(keys.length);

    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const db = firebase.firestore();
        db.settings({
          timestampsInSnapshots: true,
        });
        const questRef = db.collection('questions').add({
          question_title: values.questionTitle,
          question: values.question,
          answer_choices: values.answerChoice,
        });
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };

    getFieldDecorator('keys', { initialValue: [0] });

    const keys = getFieldValue('keys');

    const formItems = keys.map((k, index) => (
      <FormItem
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'Answer Choice' : ''}
        required
        key={k}
      >
        {getFieldDecorator(`answerChoice[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message:
                index === 0
                  ? 'Please enter answer choice.'
                  : 'Please enter answer choice or delete this field.',
            },
          ],
        })(
          <Input
            placeholder="Enter answer choices"
            style={{ width: '60%', marginRight: 8 }}
          />,
        )}
        {keys.length > 1 && index > 0 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        ) : null}
      </FormItem>
    ));

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="Question Title" required>
          {getFieldDecorator(`questionTitle`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'Please enter title of question',
              },
            ],
          })(
            <Input
              placeholder="Title of Question"
              style={{ width: '60%', marginRight: 8 }}
            />,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Ask your Question" required>
          {getFieldDecorator(`question`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'Please enter your question',
              },
            ],
          })(
            <Input
              placeholder="Ask your Question"
              style={{ width: '60%', marginRight: 8 }}
            />,
          )}
        </FormItem>

        {formItems}

        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
        </FormItem>

        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedCreateQuestion = Form.create()(CreateQuestion);

export default WrappedCreateQuestion;
