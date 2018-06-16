import {
  createList,
  disposeList,
  forEachItem,
  insertItemAfter,
  removeItem
} from './linked-list';

const makeThreeItemList = () => {
  const list1 = createList(1);
  const list2 = createList(2);
  const list3 = createList(3);
  insertItemAfter(list1, list2);
  insertItemAfter(list2, list3);
  return [list1, list2, list3];
};

describe('LinkedList', () => {
  it('createList', () => {
    const list = createList('test');
    expect(list.value).toEqual('test');
  });

  it('insertItemAfter', () => {
    const list = createList(1);
    insertItemAfter(list, createList(2));
    expect(list.next!.value).toEqual(2);
    expect(list.next!.prev).toEqual(list);
  });

  it('removeItem', () => {
    const [list1, list2, list3] = makeThreeItemList();
    removeItem(list2);
    expect(list1.next).toEqual(list3);
    expect(list3.prev).toEqual(list1);
  });

  it('forEachItem', () => {
    const [list1, ,] = makeThreeItemList();
    let sum = 0;
    forEachItem(list1, x => (sum += x));
    expect(sum).toEqual(6);
  });

  it('disposeList', () => {
    const [list1, list2, list3] = makeThreeItemList();
    disposeList(list1);
    expect(list1.next).toBe(undefined);
    expect(list1.prev).toBe(undefined);
    expect(list2.next).toBe(undefined);
    expect(list2.prev).toBe(undefined);
    expect(list3.next).toBe(undefined);
    expect(list3.prev).toBe(undefined);
  });
});
