import { MappedSignal } from './mapped-signal';
import { Signal } from './signal';

describe('MappedSignal', () => {
  it('get', () => {
    const signal = new Signal(2);
    const mapped = new MappedSignal(signal, x => x * 2);
    expect(mapped.get()).toEqual(4);
  });

  it('follow', () => {
    const signal = new Signal(2);
    const mapped = new MappedSignal(signal, x => x * 2);
    let v;
    mapped.follow(value => (v = value));
    signal.set(50);
    expect(v).toEqual(100);
  });

  it('set', () => {
    const signal = new Signal(2);
    const mapped = new MappedSignal(signal, x => x * 2);
    expect(() => mapped.set(5)).toThrow();
  });
});
