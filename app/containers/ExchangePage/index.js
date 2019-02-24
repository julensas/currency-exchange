/**
 *
 * ExchangePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectExchangePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import * as actions from './actions';

export class ExchangePage extends React.Component {
  componentWillMount() {
    this.props.actions.fetchRates();
  }

  componentWillUnmount() {
    this.props.actions.clearState();
  }

  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

ExchangePage.propTypes = {
  actions: PropTypes.shape({
    fetchRates: PropTypes.func.isRequired,
    clearState: PropTypes.func.isRequired,
  }),
};

const mapStateToProps = createStructuredSelector({
  exchangePage: makeSelectExchangePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'exchangePage', reducer });
const withSaga = injectSaga({ key: 'exchangePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ExchangePage);
