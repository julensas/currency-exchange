/**
 *
 * ExchangeCarousel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'nuka-carousel';
import classnames from 'classnames';

import Button from 'components/Button';
import style from './style.scss';

class ExchangeCarousel extends React.Component {
  renderBottomCenterControls = ({ currentSlide, slideCount, goToSlide }) => {
    const { availableCurrencies } = this.props;
    return (
      <ul className={style.bottomControls}>
        {[...new Array(slideCount)].map((b, i) => (
          <li
            key={availableCurrencies[i].code}
            className={classnames({ active: i === currentSlide })}
          >
            <Button
              label={availableCurrencies[i].code}
              goToSlide={goToSlide}
              index={i}
            />
          </li>
        ))}
      </ul>
    );
  };

  render() {
    return (
      <Carousel
        renderCenterLeftControls={null}
        renderCenterRightControls={null}
        renderBottomCenterControls={this.renderBottomCenterControls}
        {...this.props}
      />
    );
  }
}

ExchangeCarousel.propTypes = {
  availableCurrencies: PropTypes.array.isRequired,
};

export default ExchangeCarousel;
