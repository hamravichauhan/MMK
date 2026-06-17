import * as migration_20260530_112917_init from './20260530_112917_init';
import * as migration_20260611_112533_fix_video_tags_schema from './20260611_112533_fix_video_tags_schema';
import * as migration_20260611_123953_baseline_setup from './20260611_123953_baseline_setup';

export const migrations = [
  {
    up: migration_20260530_112917_init.up,
    down: migration_20260530_112917_init.down,
    name: '20260530_112917_init',
  },
  {
    up: migration_20260611_112533_fix_video_tags_schema.up,
    down: migration_20260611_112533_fix_video_tags_schema.down,
    name: '20260611_112533_fix_video_tags_schema',
  },
  {
    up: migration_20260611_123953_baseline_setup.up,
    down: migration_20260611_123953_baseline_setup.down,
    name: '20260611_123953_baseline_setup'
  },
];
