import { test } from 'ava';
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

test('createList', t => {
  const list = createList('test');
  t.is(list.value, 'test');
});

test('insertItemAfter', t => {
  const list = createList(1);
  insertItemAfter(list, createList(2));
  t.is(list.next!.value, 2);
  t.is(list.next!.prev, list);
});

test('removeItem', t => {
  const [list1, list2, list3] = makeThreeItemList();
  removeItem(list2);
  t.is(list1.next, list3);
  t.is(list3.prev, list1);
});

test('forEachItem', t => {
  const [list1, ,] = makeThreeItemList();
  let sum = 0;
  forEachItem(list1, x => (sum += x));
  t.is(sum, 6);
});

test('disposeList', t => {
  const [list1, list2, list3] = makeThreeItemList();
  disposeList(list1);
  t.is(list1.next, undefined);
  t.is(list1.prev, undefined);
  t.is(list2.next, undefined);
  t.is(list2.prev, undefined);
  t.is(list3.next, undefined);
  t.is(list3.prev, undefined);
});
