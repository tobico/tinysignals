import { Signal } from './signal';

export interface PromiseStatus<Value> {
  status: 'pending' | 'failed' | 'resolved';
  value?: Value;
  error?: Error;
}

export class PromiseSignal<Type> extends Signal<PromiseStatus<Type>> {
  constructor(promise: Promise<Type>) {
    super({ status: 'pending' });
    promise
      .then(value => super.set({ status: 'resolved', value }))
      .catch(error => super.set({ status: 'failed', error }));
  }

  public set(_: PromiseStatus<Type>): void {
    throw new Error('Cannot set value');
  }
}
