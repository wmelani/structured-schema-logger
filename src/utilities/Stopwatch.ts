export default class Stopwatch {
  private readonly NS_PER_SEC = 1e9;
  private startTime: [number, number];
  private stopTime: [number, number];

  public start(): void {
    this.startTime = process.hrtime();
    this.stopTime = null;
  }
  public stop(): number {
    this.throwIfNotStarted();
    this.stopTime = process.hrtime(this.startTime);
    return this.durationInNanoseconds();
  }

  public durationInNanoseconds(): number {
    this.throwIfNotStopped();
    return this.stopTime[0] * this.NS_PER_SEC + this.stopTime[1];
  }

  private throwIfNotStarted() {
    if (!this.startTime) {
      throw new Error("Stopwatch must be started first.");
    }
  }
  private throwIfNotStopped() {
    if (!this.stopTime) {
      throw new Error("Stopwatch must be stopped first.");
    }
  }
}
