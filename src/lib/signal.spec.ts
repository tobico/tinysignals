import { Signal } from './signal';

describe('Signal', () => {
  it('get', () => {
    const signal = new Signal(5);
    expect(signal.get()).toEqual(5);
  });

  it('set', () => {
    const signal = new Signal(5);
    signal.set(20);
    expect(signal.get()).toEqual(20);
  });

  it('follow', () => {
    const signal = new Signal(5);
    let v;
    signal.follow(value => {
      v = value;
    });
    signal.set(80);
    expect(v).toEqual(80);
  });

  it('follow without runNow', () => {
    const signal = new Signal(5);
    let v = 10;
    signal.follow(value => {
      v = value;
    });
    expect(v).toEqual(10);
  });

  it('follow with runNow', () => {
    const signal = new Signal(5);
    let v;
    signal.follow(value => {
      v = value;
    }, true);
    expect(v).toEqual(5);
  });

  it('follow and unfollow', () => {
    const signal = new Signal(5);
    let v;
    const unfollow = signal.follow(value => {
      v = value;
    });
    signal.set(80);
    unfollow();
    signal.set(19);
    expect(v).toEqual(80);
  });

  it('dispose', () => {
    const signal = new Signal(5);
    let v;
    signal.follow(value => {
      v = value;
    });
    signal.set(80);
    signal.dispose();
    signal.set(19);
    expect(v).toEqual(80);
  });
});
