import { makeAutoObservable, when } from 'mobx'

const SECOND = 1000

export class CountdownTimer {
  remainingMilliseconds;
  private readonly startingMilliSeconds
  isRunning = false

  constructor(initialSeconds: number) {
    makeAutoObservable(this)
    this.remainingMilliseconds = initialSeconds * SECOND
    this.startingMilliSeconds = initialSeconds * SECOND

    when(() => this.remainingMilliseconds < 0, () => this.resetTimer())
  }

  start() {
    this.isRunning = true
    setTimeout(() => this.tick(), SECOND);
  }

  tick() {
    if (!this.isRunning) {
      return
    };
    this.remainingMilliseconds = this.remainingMilliseconds - SECOND;
    setTimeout(() => this.tick(), SECOND);
  }

  resetTimer() {
    this.isRunning = false
    this.remainingMilliseconds = this.startingMilliSeconds
  }

  get display() {
    return `${this.remainingMilliseconds / SECOND} seconds`
  }
}

export class TimerStore {
  private countdownTimer: CountdownTimer
  timerLength = 30

  constructor() {
    this.countdownTimer = new CountdownTimer(this.timerLength)
    makeAutoObservable(this)
  }

  start = () => {
    this.countdownTimer.start();
  }

  get isRunning() {
    return this.countdownTimer.isRunning
  }

  get display() {
    return `${this.countdownTimer.remainingMilliseconds / SECOND} seconds`
  }

}