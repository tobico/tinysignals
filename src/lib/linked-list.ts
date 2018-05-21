export interface LinkedList<Type> {
  value: Type;
  prev?: LinkedList<Type>;
  next?: LinkedList<Type>;
}

export function createList<Type>(value: Type): LinkedList<Type> {
  return { value };
}

export function insertItemAfter<Type>(
  item: LinkedList<Type>,
  newItem: LinkedList<Type>
): void {
  const next = item.next;
  item.next = newItem;
  newItem.prev = item;
  if (next) {
    newItem.next = next;
    next.prev = newItem;
  }
}

export function removeItem<Type>(item: LinkedList<Type>): void {
  const prev = item.prev;
  const next = item.next;
  if (prev !== undefined) {
    prev.next = next;
  }
  if (next !== undefined) {
    next.prev = prev;
  }
  item.next = undefined;
  item.prev = undefined;
}

export function forEachItem<Type>(
  list: LinkedList<Type> | undefined,
  callback: (value: Type) => void
): void {
  let currentItem = list;
  while (currentItem !== undefined) {
    callback(currentItem.value);
    currentItem = currentItem.next;
  }
}

export function disposeList<Type>(list: LinkedList<Type> | undefined): void {
  let currentItem = list;
  while (currentItem !== undefined) {
    const nextItem = currentItem.next;
    currentItem.prev = undefined;
    currentItem.next = undefined;
    currentItem = nextItem;
  }
}
