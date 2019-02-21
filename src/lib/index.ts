class Logbook {
  private emit: boolean;

  constructor() {
    this.emit = false;
  }

  public log(...args: unknown[]) {
    this.emit && console.log(...args);
  }
}
