'use strict';

export const ERROR_MESSAGES = {
  INVALID_SORT: 'Invalid input for sorting',
  INVALID_LIMIT: 'Invalid input for limit',
  INVALID_OFFSET: 'Invalid input for offset',
  INVALID_ID: 'Invalid product ID',
  INVALID_ITEM_ID: 'Invalid device Item ID',
  INVALID_ID_OR_ITEM_ID: 'ID or Item ID is required',
  SERVER_ERROR: 'Internal Server Error',
  EXISTING_EMAIL: 'Email is already taken',
};

export const GENERIC_MESSAGES = {
  INVALID_SORTING: 'Invalid query for sorting, limit, or offset',
  INVALID_ID: ERROR_MESSAGES.INVALID_ID,
  INVALID_ITEM_ID: ERROR_MESSAGES.INVALID_ITEM_ID,
  INVALID_ID_OR_ITEM_ID: ERROR_MESSAGES.INVALID_ID_OR_ITEM_ID,
  EXISTING_EMAIL: ERROR_MESSAGES.EXISTING_EMAIL,
};

export const ERROR_CODES = {
  INVALID_SORT: 'invalid sort',
  INVALID_LIMIT: 'invalid limit',
  INVALID_OFFSET: 'invalid offset',
  INVALID_ID: 'invalid product id',
  INVALID_ITEM_ID: 'invalid device itemId',
  INVALID_ID_OR_ITEM_ID: 'invalid id or itemId',
  SERVER_ERROR: 'internal server error',
  EXISTING_EMAIL: 'Email is already taken',
};

export const ALL_ERROR_MESSAGES = { ...ERROR_MESSAGES, ...GENERIC_MESSAGES };
