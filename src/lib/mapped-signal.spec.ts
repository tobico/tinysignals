import { test } from 'ava';
import { MappedSignal } from './mapped-signal';
import { Signal } from './signal';

test('get', t => {
  const signal = new Signal(2);
  const mapped = new MappedSignal(signal, x => x * 2);
  t.is(mapped.get(), 4);
});

test('follow', t => {
  const signal = new Signal(2);
  const mapped = new MappedSignal(signal, x => x * 2);
  let v;
  mapped.follow(value => (v = value));
  signal.set(50);
  t.is(v, 100);
});

test('set', t => {
  const signal = new Signal(2);
  const mapped = new MappedSignal(signal, x => x * 2);
  t.throws(() => mapped.set(5));
});
