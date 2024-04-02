import { EOL } from 'os';
import { appendFileSync } from 'fs';
import * as pgMonitor from 'pg-monitor';
import { IInitOptions } from 'pg-promise';

pgMonitor.setTheme('matrix'); // changing the default theme;

// Flag to indicate whether we are in a DEV environment:
const $DEV = process.env.NODE_ENV === 'development';

// Log file for database-related errors:
const logFile = './db/errors.log';

// Below we are logging errors exactly the way they are reported by pg-monitor,
// which you can tweak any way you like, as parameter 'info' provides all the
// necessary details for that.

pgMonitor.setLog((msg, info) => {
  // In a PROD environment we will only receive event 'error',
  // because this is how we set it up below.

  // And the check below is for DEV environment only, as we want to log
  // errors only, or else the file will grow out of proportion in no time.

  if (info.event === 'error') {
    let logText = EOL + msg; // line break + next error message;
    if (info.time) {
      // If it is a new error being reported,
      // and not an additional error line;
      logText = EOL + logText; // add another line break in front;
    }
    appendFileSync(logFile, logText); // add error handling as required;
  }

  // We absolutely must not let the monitor write anything into the console
  // while in a PROD environment, and not just because nobody will be able
  // to see it there, but mainly because the console is incredibly slow and
  // hugely resource-consuming, suitable only for debugging.

  if (!$DEV) {
    // If it is not a DEV environment:
    info.display = false; // display nothing;
  }
});

export class Diagnostics {
  // Monitor initialization function;
  static init<Ext = Record<string, never>>(options: IInitOptions<Ext>) {
    if ($DEV) {
      // In a DEV environment, we attach to all supported events:
      pgMonitor.attach(options);
    } else {
      // In a PROD environment we should only attach to the type of events
      // that we intend to log. And we are only logging event 'error' here:
      pgMonitor.attach(options, ['error']);
    }
  }
}
