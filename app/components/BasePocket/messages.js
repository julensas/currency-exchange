/*
 * BasePocket Messages
 *
 * This contains all the text for the ExchangePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.component.BasePocket';

export default defineMessages({
  youHave: {
    id: `${scope}.youHave`,
    defaultMessage: 'You have: {amount}',
  },
  error: {
    id: `${scope}.error`,
    defaultMessage: 'Insufficient funds',
  },
});
