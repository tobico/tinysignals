import { PromiseSignal } from './promise-signal';

describe('PromiseSignal', () => {
  it('pending', () => {
    const promise = { then: () => promise, catch: () => promise } as any;
    const signal = new PromiseSignal(promise);

    expect(signal.get().status).toEqual('pending');
  });
});
