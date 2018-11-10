/**
 *
 * Statistics
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Doughnut } from 'react-chartjs-2';

import messages from '../messages';

const data = {
  labels: ['Red', 'Green', 'Yellow'],
  datasets: [
    {
      title: ' <h3>(%)</h3>',
      data: [12, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};
/* eslint-disable react/prefer-stateless-function */
export default class Statistics extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Statistics</title>
          <meta name="description" content="Description of Statistics" />
        </Helmet>
        <center>
          <h2>(%)</h2>
        </center>
        <Doughnut data={data} />
      </div>
    );
  }
}
