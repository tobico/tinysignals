import { test } from 'ava';
import { Signal } from './signal';

test('get', t => {
  const signal = new Signal(5);
  t.is(signal.get(), 5);
});

test('set', t => {
  const signal = new Signal(5);
  signal.set(20);
  t.is(signal.get(), 20);
});

test('follow', t => {
  const signal = new Signal(5);
  let v;
  signal.follow(value => {
    v = value;
  });
  signal.set(80);
  t.is(v, 80);
});

test('follow and unfollow', t => {
  const signal = new Signal(5);
  let v;
  const unfollow = signal.follow(value => {
    v = value;
  });
  signal.set(80);
  unfollow();
  signal.set(19);
  t.is(v, 80);
});

test('dispose', t => {
  const signal = new Signal(5);
  let v;
  signal.follow(value => {
    v = value;
  });
  signal.set(80);
  signal.dispose();
  signal.set(19);
  t.is(v, 80);
});
