import type { NextFunction, Request, Response } from 'express';

import { services } from '../../services';
import AppError from '../../util/app-error';
import getDeviceID from '../../util/device-id';

/**
 * Validates whether a user is authenticated or not (via sessions).
 * Also performs a check as to whether the user's session ID exists in Redis.
 *
 * @param req - Express.js's request object.
 * @param _ - Express.js's response object.
 * @param next - Express.js's next function.
 */
const hasSession = async (req: Request, _res: Response, next: NextFunction) => {
  const { ID } = req.session;

  // Validates whether the session exists or not.
  if (!ID) {
    next(new AppError('You are not logged in yet! Please log in first!', 401));
    return;
  }

  // Check in an unlikely scenario: a user has already deleted his account but their session is still active.
  const user = await services.user.getUser({ ID: ID });
  if (!user) {
    next(new AppError('User belonging to this session does not exist.', 400));
    return;
  }

  // Verifies if the user is not banned (isActive is true).
  if (!user.isActive) {
    next(new AppError('User is not active. Please contact the admin.', 403));
    return;
  }

  const lastActive = Date.now().toString();
  const sessionInfo = getDeviceID(req);

  // Refresh session data to contain the new session information.
  req.session.lastActive = lastActive;
  req.session.sessionInfo = sessionInfo;

  // Go to the next middleware.
  next();
};

export default hasSession;
