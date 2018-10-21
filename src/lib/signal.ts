import { Event } from './event';

export class Signal<Type> {
  private latest: Type;
  private event: Event<[Type]>;

  constructor(initial: Type) {
    this.latest = initial;
    this.event = new Event();
  }

  public set(value: Type): void {
    if (value !== this.latest) {
      this.latest = value;
      this.event.call(value);
    }
  }

  public get(): Type {
    return this.latest;
  }

  public follow(
    callback: (type: Type) => void,
    runNow: boolean = false
  ): () => void {
    if (runNow) {
      callback(this.latest);
    }
    return this.event.follow(callback);
  }

  public dispose(): void {
    this.event.dispose();
  }
}
