# tinysignals

Simple observable data structure

## Introduction

Tinysignals are like regular variables that allow you to subscribe to changes on them. They provide a simple, lightweight alternative to more complex observerables or event listeners.

## Signal types

### Signal

`Signal` is the basic signal class. You seed it with an initial value, and then can subscribe to follow it, as well as getting or setting the value at any time.

```js
const signal = new Signal(1)
signal.follow(value => console.log(value))
signal.set(2) // console logs 2
signal.set(signal.get() + 1) // console logs 3
```

### MappedSignal

MappedSignal allows you to created a new signal that "maps" and existing signal through a function, updating the result of the function when the mapped signal changes.

```js
const signal = new Signal(2)
const mapped = new MappedSignal(signal, (value) => value * 2)
mapped.get() // returns 4
mapped.follow(value => console.log(value))
signal.set(5) // console logs 10
```

### MergedSignal

MergedSignal is like a MappedSignal, but it accepts more than 1 input. The result is updated whenever any of the input signals change.

```js
const signalA = new Signal('foo')
const signalB = new Signal('bar')
const merged = new MergedSignal({ a: signalA, b: signalB }, ({ a, b }) => a + b)
sum.get() // returns 'foobar'
sum.follow(value => console.log(value))
signalA.set('tiny') // console logs 'tinybar'
signalB.set('signal') // console logs 'tinysignal'
```

### PromiseSignal

PromiseSignal wraps the status of a Promise as a signal.

```js
const signal = new PromiseSignal(myPromise)
signal.get() // returns { status: 'pending' }
signal.follow(value => console.log(value))
// when promise resolves, console logs { status: 'resolved', value: 'someValue' }
```
