import {NOTIFY_USER} from "./types";

import React from 'react';

export const notifyUser = (message, messageType) => {
  return {
    type: NOTIFY_USER,
    message, messageType
  };
};
