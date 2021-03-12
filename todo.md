# Todo

## Core

- [x] createDesign
  - [x] TypeScript helper methods
- [x] createState
- [x] Data
- [x] States
  - [x] Nested states
  - [x] onEnter events
  - [x] onExit events
  - [x] onEvent events
  - [x] Repeat events
- [x] collections
  - [x] actions
  - [x] conditions
  - [x] results
  - [x] asyncs
- [x] Event handling
  - [x] Actions
  - [x] Sends
  - [x] Conditions
  - [x] Waits
- [x] Transitions
- [x] Move handlers to syncronous state
- [ ] Nested machines

  - [x] Fix frozen object errors
  - [x] Multiple Parallel Transitions?

  ```js
  {
    to: ["bold.disabled", "italic.disabled"]
  }
  ```

  - [x] direct (`target`)
  - [x] deep (`parent.target`)
  - [x] previous (`.previous`)
  - [x] restore (`.restore`)

- [x] Public API
  - [x] data
  - [x] `stateTree`
  - [x] `active`
  - [x] Methods
    - [x] `onUpdate`
    - [x] `getUpdate`
    - [x] `getConfig`
    - [x] `isIn`
    - [x] `whenIn`
    - [x] `clone`
    - [x] `send`
      - [x] async/await send
      - [x] send method chaining (async)
- [ ] Testing
  - [x] initial tests
  - [x] transition tests
  - [x] complex tests

## React

- [x] useStateDesigner
  - [x] with config
  - [x] with state designer
- [ ] Testing
  - [x] initial tests
  - [ ] complex tests

## Repo

- [x] split into packages
  - [x] core
  - [x] react
  - [x] viewer
- [x] move to tsdx

## Readmes and Docs

- [x] Examples
- [x] Starters
- [x] License
- [ ] Rewrite

## Viewer

- [x] package
- [ ] design
- [ ] auth

## Tutorials

- [x] counter
- [x] toggle
- [x] input
- [x] todo
- [x] todos
- [x] stopwatch
- [x] timer
- [x] dogs
- [x] tiles
- [x] snake
- [x] player
- [x] breakout
- [x] drawing
- [x] calculator

## Designer

- [x] Package
- [x] Skeleton
