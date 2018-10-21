import {
  createList,
  disposeList,
  forEachItem,
  insertItemAfter,
  LinkedList,
  removeItem
} from './linked-list';

export class Event<CallbackArgs extends any[]> {
  private listeners?: LinkedList<(...CallbackArgs) => void>;

  public call(...args: CallbackArgs): void {
    forEachItem(this.listeners, callback => callback(...args));
  }

  public follow(callback: (...CallbackArgs) => void): () => void {
    const item = createList(callback);
    if (this.listeners === undefined) {
      this.listeners = item;
    } else {
      insertItemAfter(this.listeners, item);
    }

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
