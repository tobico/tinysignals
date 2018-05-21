import { test } from 'ava';
import { PromiseSignal } from '..';

test('pending', t => {
  const promise = new Promise(() => null);
  const signal = new PromiseSignal(promise);
  t.deepEqual(signal.get(), { status: 'pending' });
});
