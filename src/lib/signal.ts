import {
  createList,
  disposeList,
  forEachItem,
  insertItemAfter,
  LinkedList,
  removeItem
} from './linked-list';

export type SignalCallback<Type> = (value: Type) => void;

export class Signal<Type> {
  private latest: Type;
  private listeners?: LinkedList<SignalCallback<Type>>;

  constructor(initial: Type) {
    this.latest = initial;
  }

  public set(value: Type): void {
    if (value !== this.latest) {
      this.latest = value;
      forEachItem(this.listeners, callback => callback(value));
    }
  }

  public get(): Type {
    return this.latest;
  }

  public follow(callback: SignalCallback<Type>): () => void {
    const item = createList(callback);
    if (this.listeners === undefined) {
      this.listeners = item;
    } else {
      insertItemAfter(this.listeners, item);
    }
    callback(this.latest);

    return () => {
      if (item === this.listeners) {
        this.listeners = this.listeners.next;
      } else {
        removeItem(item);
      }
    };
  }

  public dispose(): void {
    disposeList(this.listeners);
    delete this.listeners;
  }
}
