import { MergedSignal } from './merged-signal';
import { Signal } from './signal';

describe('MergedSignal', () => {
  it('get', () => {
    const signalA = new Signal(1);
    const signalB = new Signal(2);
    const merged = new MergedSignal(
      { a: signalA, b: signalB },
      ({ a, b }) => a + b
    );
    expect(merged.get()).toEqual(3);
  });

  it('follow', () => {
    const signalA = new Signal(1);
    const signalB = new Signal(2);
    const merged = new MergedSignal(
      { a: signalA, b: signalB },
      ({ a, b }) => a + b
    );
    let v;
    merged.follow(value => (v = value));
    signalA.set(9);
    expect(v).toEqual(11);
    signalB.set(-5);
    expect(v).toEqual(4);
  });

  it('set', () => {
    const signalA = new Signal(1);
    const signalB = new Signal(2);
    const merged = new MergedSignal(
      { a: signalA, b: signalB },
      ({ a, b }) => a + b
    );
    expect(() => merged.set(5)).toThrow();
  });
});
