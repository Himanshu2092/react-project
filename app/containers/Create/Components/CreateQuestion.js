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
  constructor(props) {
    super(props);
    const { storeData, form, storeData: isEdit } = this.props;
    this.state = {
      data: storeData.questionDetails,
    };
  }

  ComponentDidMount() {}

  ComponentDidUpdate() {}

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
    const { form, save, edit, storeData } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const db = firebase.firestore();
        db.settings({
          timestampsInSnapshots: true,
        });
        if (storeData.isEdit && storeData.questionDetails.length > 0) {
          const questRef = db
            .collection('questions')
            .doc(
              storeData.questionDetails[0]
                ? storeData.questionDetails[0].id
                : '1',
            );

          questRef.get().then(snapshot => {
            if (snapshot.exists) {
              let questionObj = {
                question_title: values.questionTitle,
                question: values.question,
                answer_choices: values.answerChoice.map((answer, index) => {
                  return {
                    key: index + 1,
                    choice: answer,
                    answered: [],
                  };
                }),
              };

              questRef.update({ ...questionObj }).then(() => {
                let questData = [];
                questData.push(questionObj);
                save(questData, 'update');
                edit(false);
              });
            }
          });
        } else {
          let questionObj = {
            question_title: values.questionTitle,
            question: values.question,
            answer_choices: values.answerChoice.map((answer, index) => {
              return {
                key: index + 1,
                choice: answer,
                answered: [],
              };
            }),
            delete: false,
          };

          const questRef = db
            .collection('questions')
            .add({ ...questionObj })
            .then(ref => {
              let questObj = {
                id: ref.id,
                ...questionObj,
              };

              let questData = [];
              questData.push(questObj);
              save(questData, 'add');
            });
        }
      }
    });
  };

  render() {
    const { data } = this.state;

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
    let keyValues = [0];
    if (data.length > 0) {
      keyValues = data[0].answer_choices.map((x, index) => {
        return index;
      });
    }

    getFieldDecorator('keys', {
      initialValue: [...keyValues],
    });

    const keys = getFieldValue('keys');

    const formItems = keys.map((k, index) => (
      <FormItem
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'Answer Choice' : ''}
        required
        key={k}
      >
        {getFieldDecorator(`answerChoice[${k}]`, {
          initialValue:
            data.length > 0
              ? data[0].answer_choices[index] == undefined
                ? ''
                : data[0].answer_choices[index].choice
              : '',
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
            initialValue: data.length > 0 ? data[0].question_title : '',
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
            initialValue: data.length > 0 ? data[0].question : '',
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
