/**
 *
 * ExchangePage
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import BasePocket from 'components/BasePocket';
import RatePocket from 'components/RatePocket';
import ExchangeCarousel from 'components/ExchangeCarousel';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectExchangePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import * as actions from './actions';
import style from './style.scss';

export class ExchangePage extends React.Component {
  state = {
    value: 0,
    slideIndex: 0,
    rateSlideIndex: 0,
  };

  componentWillMount() {
    const {
      exchange: { availableCurrencies },
      actions: { fetchRates },
    } = this.props;
    fetchRates(availableCurrencies[0].code);
  }

  componentWillUnmount() {
    this.props.actions.clearState();
  }

  onInputChange = value => this.setState({ value });

  onAfterSlide = slideIndex => {
    const {
      exchange: { availableCurrencies },
      actions: { fetchRates },
    } = this.props;
    this.setState({ slideIndex, value: 0 });
    fetchRates(availableCurrencies[slideIndex].code);
  };

  onRateAfterSlide = rateSlideIndex => this.setState({ rateSlideIndex });

  onExchange = e => {
    e.preventDefault();
    const {
      exchange: {
        latest: { base, rates },
        availableCurrencies,
      },
      actions: { exchange },
    } = this.props;
    const { value, rateSlideIndex } = this.state;
    const filteredCurrencies = availableCurrencies.filter(
      c => c.code !== (base || 'USD'),
    );
    exchange(
      base,
      parseFloat(value),
      filteredCurrencies[rateSlideIndex].code,
      Math.abs(value * (rates[filteredCurrencies[rateSlideIndex].code] || 1)),
    );
    this.setState({ value: 0 });
  };

  render() {
    const { value, slideIndex, rateSlideIndex } = this.state;
    const {
      exchange: {
        latest: { base, rates },
        isLoading,
        availableCurrencies,
      },
    } = this.props;
    const selectedCurrency = availableCurrencies.find(
      c => c.code === (base || 'USD'),
    );
    const filteredCurrencies = availableCurrencies.filter(
      c => c.code !== (base || 'USD'),
    );
    return (
      <Fragment>
        <form className={style.exchangePage} onSubmit={this.onExchange}>
          <ExchangeCarousel
            slideIndex={slideIndex}
            afterSlide={this.onAfterSlide}
            availableCurrencies={availableCurrencies}
          >
            {availableCurrencies.map(currency => (
              <BasePocket
                key={currency.code}
                currency={currency}
                value={value}
                base={base || 'USD'}
                onInputChange={this.onInputChange}
              />
            ))}
          </ExchangeCarousel>
          <ExchangeCarousel
            availableCurrencies={filteredCurrencies}
            enableKeyboardControls
            slideIndex={rateSlideIndex}
            afterSlide={this.onRateAfterSlide}
          >
            {filteredCurrencies.map(currency => (
              <RatePocket
                key={currency.code}
                currency={currency}
                base={base || 'USD'}
                isLoading={isLoading}
                rate={rates[currency.code]}
                baseCurrencySymbol={
                  availableCurrencies.find(c => c.code === (base || 'USD'))
                    .symbol
                }
                value={value * (rates[currency.code] || 1)}
              />
            ))}
          </ExchangeCarousel>
          <button
            type="submit"
            disabled={value === 0 || selectedCurrency.balance < Math.abs(value)}
          >
            <FormattedMessage {...messages.exchange} />
          </button>
        </form>
      </Fragment>
    );
  }
}

ExchangePage.propTypes = {
  actions: PropTypes.shape({
    fetchRates: PropTypes.func.isRequired,
    clearState: PropTypes.func.isRequired,
    exchange: PropTypes.func.isRequired,
  }),
  exchange: PropTypes.shape({
    latest: PropTypes.object.isRequired,
  }),
};

const mapStateToProps = createStructuredSelector({
  exchange: makeSelectExchangePage(),
});

export function mapDispatchToProps(dispatch) {
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
