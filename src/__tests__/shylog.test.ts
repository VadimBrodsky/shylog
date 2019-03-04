import Shylog from '../lib';

describe('Shylog', () => {
  describe('constructor', () => {
    it('should not log anything if emit set to false', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => jest.fn());

      const logger = new Shylog({
        emit: false,
        logger: console.log
      });

      const logMessage = 'Can you see this?';
      logger.log(logMessage);

      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('should accept an external logger', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => jest.fn());

      const logger = new Shylog({
        emit: true,
        logger: console.log
      });

      const logMessage = 'Can you see this?';
      logger.log(logMessage);

      expect(consoleSpy).toHaveBeenCalledWith(logMessage);
    });
  });

  describe('.error', () => {
    it('should store the error message', () => {
      const logger = new Shylog();

      expect(logger.error).toBeDefined();
      logger.error('Abort', { failed: true });

      // @ts-ignore
      expect(logger.buffer).toHaveLength(1);
    });
  });

  describe('.warn', () => {
    it('should store the warn message', () => {
      const logger = new Shylog();

      expect(logger.warn).toBeDefined();
      logger.warn('That', 'was', 'a', 'close', 'call');

      // @ts-ignore
      expect(logger.buffer).toHaveLength(1);
    });
  });

  describe('.info', () => {
    it('should store the info message', () => {
      const logger = new Shylog();

      expect(logger.info).toBeDefined();
      logger.info('Back to normal');

      // @ts-ignore
      expect(logger.buffer).toHaveLength(1);
    });
  });

  describe('.log', () => {
    it('should store the log message', () => {
      const logger = new Shylog();

      expect(logger.log).toBeDefined();
      logger.log('Something happened');

      // @ts-ignore
      expect(logger.buffer).toHaveLength(1);
    });
  });

  describe('.setLevel', () => {
    it('should return a custom log level function', () => {
      const logger = new Shylog();
      const panic = logger.setLevel('panic');

      panic('FIRE! FIRE! FIRE!');
      expect(logger.getLogs(panic)).toHaveLength(1);
    });
  })

  describe('.getLogs', () => {
    it('should return all logged items when has no parameters', () => {
      const logger = new Shylog();

      logger.log('Something happened');
      logger.error('Abort', { failed: true });
      logger.warn('That', 'was', 'a', 'close', 'call');
      logger.info('Back to normal');

      expect(logger.getLogs()).toBeDefined();
    });

    it('should return all logged  items for a specified level number', () => {
      const logger = new Shylog();

      logger.error('first error');
      logger.error('second error');
      logger.info('something something');
      const logs = logger.getLogs(1);

      expect(logs).toBeDefined();
      expect(logs).toHaveLength(2);
    });

    it('should return all logged items for a specified log function', () => {
      const logger = new Shylog();

      logger.warn('warn 1st');
      logger.warn('warn 2nd');
      logger.info('something something');
      const logs = logger.getLogs(logger.warn);

      expect(logs).toBeDefined();
      expect(logs).toHaveLength(2);
    });
  });
});
