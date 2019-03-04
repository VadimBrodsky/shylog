interface Log {
  level: LogLevel | string;
  time: number;
  msg: string;
}

const enum LogLevel {
  error = 1,
  warn = 2,
  info = 3,
  log = 4,
  // debug = 5,
  // trace = 6,
}

interface LogFn {
  (...args: unknown[]): void;
  level: Log['level'];
}

class Shylog {
  private emit: boolean;
  private buffer: Log[];
  private externalLogger: (...args: unknown[]) => unknown;
  private customLevel: {[key: string]: LogFn}

  public error: LogFn;
  public warn: LogFn;
  public info: LogFn;
  public log: LogFn;

  constructor({ emit, logger } = { emit: false, logger: console.log }) {
    this.emit = emit;
    this.externalLogger = logger;
    this.buffer = [];
    this.customLevel = {};

    this.error = this.setLevel(1);
    this.warn = this.setLevel(2);
    this.info = this.setLevel(3);
    this.log = this.setLevel(4);
  }

  public getLogs(level?: Log['level'] | LogFn) {
    if (typeof level === 'function') {
      return this.buffer.filter((log) => log.level === level.level);
    } else {
      return level ? this.buffer.filter((log) => log.level === level) : this.buffer;
    }
  }

  public setLevel(level: Log['level'] | string): LogFn {
    const logFn: LogFn = (...args: unknown[]) => {
      this.buffer.push({ level, time: Date.now(), msg: args.join(' ') });
      this.emit && this.externalLogger(...args);
    };

    logFn.level = level;
    this.customLevel[level] = logFn;

    return logFn;
  }
}

export default Shylog;
