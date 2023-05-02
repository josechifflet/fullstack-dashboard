import { Attendance } from './attendance.model';
import { Cache } from './cache.model';
import { Position } from './position.model';
import { Session } from './session.model';
import { Symbol } from './symbol.model';
import { Trader } from './trader.model';
import { TraderPerformance } from './trader_performance.model';
import { User } from './user.model';
import { VolumeTable } from './volume_table.model';

export const entities = [
  User,
  Attendance,
  Cache,
  Session,
  TraderPerformance,
  Position,
  Trader,
  Symbol,
  VolumeTable,
];

export default {
  User,
  Attendance,
  Cache,
  Session,
  TraderPerformance,
  Position,
  Trader,
  Symbol,
  VolumeTable,
};
