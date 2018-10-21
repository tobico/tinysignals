# tinysignals

Simple observable data structure

![](https://travis-ci.org/tobico/tinysignals.svg?branch=master)

## Introduction

Tinysignals are like regular variables that allow you to subscribe to changes on them. They provide a simple, lightweight alternative to more complex observables or event listeners.

### Installation

With Yarn:
```sh
yarn add tinysignals
```

Using NPM:
```sh
npm install --save tinysignals
```

## Signal types

### Signal

`Signal` is the base signal class. You seed it with an initial value, and then can subscribe to follow it, as well as getting or setting the value at any time.

```js
import { Signal } from 'tinysignals'

const signal = new Signal(1)
signal.follow(value => console.log(value))
signal.set(2) // console logs 2
signal.set(signal.get() + 1) // console logs 3
```

#### Signal methods

* `constructor(initial: Type)` creates a new signal with the given initial value
* `get(): Type` returns the current value of the signal
* `set(value: Type): void` sets a new value, and notifies any observers
* `follow(callback: (type: Type) => void, runNow: boolean = false): () => void`
  adds a new observer callback that will be notified when the signal value
  changes. If the optional `runNow` parameter is true, the callback will be
  fired immediately with the current value of the signal. The return value is an
  unfollow function that can be called to remove the observer
* `dispose()` removes all observers

### MappedSignal

MappedSignal allows you to created a new signal that "maps" an existing signal through a function, updating the result of the function when the mapped signal changes.

```js
import { Signal, MappedSignal } from 'tinysignals'

const signal = new Signal(2)
const mapped = new MappedSignal(signal, (value) => value * 2)
mapped.get() // returns 4
mapped.follow(value => console.log(value))
signal.set(5) // console logs 10
```

### MergedSignal

MergedSignal is like a MappedSignal, but it accepts more than 1 input. The result is updated whenever any of the input signals change.

```js
import { Signal, MergedSignal } from 'tinysignals'

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
import { PromiseSignal } from 'tinysignals'

const signal = new PromiseSignal(myPromise)
signal.get() // returns { status: 'pending' }
signal.follow(value => console.log(value))
// when promise resolves, console logs { status: 'resolved', value: 'someValue' }
```

## Event type

Event lets you define a simple observable event without the value storage
provided by a Signal.

```js
import { Event } from 'tinysignals'

const event = new Event()
event.follow((name) => console.log(`Hello ${name}`))
event.call('World') // console logs "Hello World"
```

#### Event methods

* `constructor()` creates a new event
* `call(...args: CallbackArgs)` calls all observer callbacks with the arguments
  provided
* `follow(callback: (...CallbackArgs) => void): () => void`
  adds a new callback that will be run when the event fires. The return value
  is an unfollow function that can be called to remove the callback
* `dispose()` removes all callbacks
