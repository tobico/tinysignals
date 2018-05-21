import { Signal } from './signal';

const getValues = (sources: any) => {
  const values: any = {};
  Object.keys(sources).forEach(key => {
    const source = sources[key];
    values[key] = source instanceof Signal ? source.get() : source;
  });
  return values;
};

export type SignalMapping<Types> = { [P in keyof Types]: Signal<Types[P]> };

export class MergedSignal<Type, SourceTypes> extends Signal<Type> {
  private bindings: Array<() => void>;

  constructor(
    sources: SignalMapping<SourceTypes>,
    combine: (values: SourceTypes) => Type
  ) {
    super(combine(getValues(sources)));

    this.bindings = Object.keys(sources).map(key =>
      (sources as any)[key].follow((value: any) => {
        const values = getValues(sources);
        values[key] = value;
        super.set(combine(values));
      })
    );
  }

  public set(_: Type): void {
    throw new Error('Cannot set value');
  }

  public dispose(): void {
    this.bindings.forEach(unbind => unbind());
    super.dispose();
  }
}
