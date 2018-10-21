import { Event } from './event';

describe('Event', () => {
  it('follow', () => {
    const event = new Event<[number]>();
    let v;
    event.follow(value => {
      v = value;
    });
    event.call(80);
    expect(v).toEqual(80);
  });

  it('follow and unfollow', () => {
    const event = new Event<[number]>();
    let v;
    const unfollow = event.follow(value => {
      v = value;
    });
    event.call(80);
    unfollow();
    event.call(19);
    expect(v).toEqual(80);
  });

  it('dispose', () => {
    const event = new Event<[number]>();
    let v;
    event.follow(value => {
      v = value;
    });
    event.call(80);
    event.dispose();
    event.call(19);
    expect(v).toEqual(80);
  });
});
