import joi from '../../util/joi';

/**
 * Special attendance validations to sanitize and analyze request bodies and parameters.
 */
const AttendanceValidation = {
  // GET /api/v1/attendances and/or /api/v1/users/{id}/attendances
  getAttendances: {
    params: joi.object().keys({
      id: joi.string().uuid({ version: 'uuidv4' }),
    }),
  },

  // POST /api/v1/attendances/in
  in: {
    body: joi.object().keys({
      remarksEnter: joi.string().trim().max(100),
    }),
  },

  // PATCH /api/v1/attendances/out
  out: {
    body: joi.object().keys({
      remarksLeave: joi.string().trim().max(100),
    }),
  },
};

export default AttendanceValidation;
