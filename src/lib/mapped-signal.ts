import { Signal } from './signal';

export class MappedSignal<Type, SourceType> extends Signal<Type> {
  private binding: () => void;

  constructor(
    sourceSignal: Signal<SourceType>,
    transform: (value: SourceType) => Type
  ) {
    super(transform(sourceSignal.get()));
    this.binding = sourceSignal.follow(value => {
      super.set(transform(value));
    });
  }

  public set(_: Type): void {
    throw new Error('Cannot set value');
  }

  public dispose(): void {
    this.binding();
    super.dispose();
  }
}
