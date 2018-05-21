import { test } from 'ava';
import { MergedSignal } from './merged-signal';
import { Signal } from './signal';

test('get', t => {
  const signalA = new Signal(1);
  const signalB = new Signal(2);
  const merged = new MergedSignal(
    { a: signalA, b: signalB },
    ({ a, b }) => a + b
  );
  t.is(merged.get(), 3);
});

test('follow', t => {
  const signalA = new Signal(1);
  const signalB = new Signal(2);
  const merged = new MergedSignal(
    { a: signalA, b: signalB },
    ({ a, b }) => a + b
  );
  let v;
  merged.follow(value => (v = value));
  signalA.set(9);
  t.is(v, 11);
  signalB.set(-5);
  t.is(v, 4);
});

test('set', t => {
  const signalA = new Signal(1);
  const signalB = new Signal(2);
  const merged = new MergedSignal(
    { a: signalA, b: signalB },
    ({ a, b }) => a + b
  );
  t.throws(() => merged.set(5));
});
