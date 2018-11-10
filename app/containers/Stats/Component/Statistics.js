/**
 *
 * Statistics
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import messages from '../messages';

/* eslint-disable react/prefer-stateless-function */
export default class Statistics extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Statistics</title>
          <meta name="description" content="Description of Statistics" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}
