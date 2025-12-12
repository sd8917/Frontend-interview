✅ 1. React.memo

Prevents a component from re-rendering unless its props change.

```
function Child({ count }: any) {
  console.log("Child rendered");
  return <div>Count: {count}</div>;
}

export default function Parent() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  return (
    <>
      <Child count={a} />
      <button onClick={() => setB(b + 1)}>Update B</button>
    </>
  );
}


===Update to

const Child = memo(function Child({ count }: any) {
  console.log("Child rendered");
  return <div>Count: {count}</div>;
});

Check by clicking on update B.

```

##✅ 2. useCallback

Prevents new function creation on every render → avoids causing child re-renders.

```



```


### ✅ With useMemo

Caches expensive calculations so the value isn’t recomputed unnecessarily.

❌ Without useMemo — expensive computation every rende


```

function App({ items }) {
  const expensive = useMemo(() => {
    return items.filter(x => x.isActive);
  }, [items]);

  return <div>{expensive.length}</div>;
}

```

## When not to use callback
🔥 1. When the Child Component is NOT memoized

If the child is not wrapped in React.memo, then the stable reference gives no benefit.

<Child onClick={handleClick} />

If Child is not memoized, it will always re-render → so useCallback is wasted.

Rule:

No React.memo → no need for useCallback.

3. When the dependency list is large

More dependencies ⇒ more work in React ⇒ slower.

Example:

const expensive = useCallback(() => {
  heavyTask(a, b, c, d, e, f, g);
}, [a, b, c, d, e, f, g]);


This forces React to re-evaluate & compare dependencies every render.


## Explain React Reconciliation and how it impacts performance

- React uses a diffing algorithm to compare:
  -> the previous virtual DOM tree
  -> with the new virtual DOM tree

- Key rules:
1. Types changes - full re-mount
  ` <div> -> <span> ` trigger unmount + mount
2. Key changes → destroy and recreate nodes
Especially inside lists

Only updates nodes affected → fine-grained updates

## 2. How does React batching work? What changed in React 18?

## 3. When does React re-render a component?
React re-render when:
1. State changes
2. Props changes
3. Context value changes
4. Parent re-render -> child re-render(if not memoized)

React does NOT re-render on:
- ref changes (useRef)
- state mutated withour setter
- object/array mutation withour new reference
- memoized children when props are stable.


## 4. Why react.memo sometime doesnt' workd

Because React.memo does shallow comparison.

It FAILS when:

new object/array/function passed every render

parent always re-renders

deep object props change

Fix:

use stable references (useCallback, useMemo)

avoid passing new object/arrays as props

avoid unnecessary parent re-renders


5. What is react render phase vs commit phase?
 Render phase
 = pure , should NOT cause side effect
 = Build virtual DOM
 = Can run multiple times(StrictMode)
 Comit Phase
 = Updates DOM
 = Runs layout effects (useLayoutEffect)
 = Runs normal effects(useEffect)

 ## 6. Explain useLayoutEffect vs useEffect , when to use which?

 == Useeffect
 - Runs after paint
 - Non-blocking
 - Good for API calls, subscription, timers

 == useLayoutEffect
 - Runs before browser paint
 - Blocks rendering
 - Good for 
          - Measuring DOM
          - syncing DOM to state
          - avoiding flicker.


## 7.What is concurrent Rendering


## 6/ Explain startTransition and how it improves UX

Use for non-urgent updated (like search result or filters)

`
startTransition(() => {
  setFilteredData(data);
});


`
Benefit 
== Keep UI responsive
== Urgent updates(typing) are not blocked
== Prevent frame drop

## 🧨 9. What are Suspense boundaries?

Allows React to show fallbacks for:

lazy components

suspended data fetching

slow resources

Example:

```

<Suspense fallback={<Loader />}>
  <Dashboard />
</Suspense>

```

Suspense improves:

perceived performance

progressive loading

interactivity


## 10. How do you optimize a React app with heavy rendering

- Virtualization (react-windoe, react-virtualized)
- Memoization (useMemo, useCallback, React.memo)
- Avoid anonymous function inline
- Split state logically
- Derived state --> compute lazily
- Suspense + Lazy loading
- Debounce & throttling
- Use profiler API
- Define stable keys
- Avoide unnecessary context

## 11. WHy large context re-render everything ?

Because when context values changes - all consumes re-render

Fix 
split context
Use selectors
Use Zustand/Jotai/Recoil for granular state

Lift expensive logic outside provider

## 12. What happens if you mutate state directly?

React cannot detect the change:

state.count++   // ❌ no re-render


Why?
React checks reference equality, not deep equality.

## 13. What’s the difference between:

Controlled vs Uncontrolled components?

Controlled → value controlled by state
Uncontrolled → value stored in DOM

Why controlled is better?

Validation

Data flow

Predictability

React devtools debugging

## 14. Why keys are important in lists?

Keys help React identify:

which items changed

which items moved

which items were added/removed

Wrong keys → wrong reconciliation → unnecessary DOM operations.

Never use index unless list is static and not reorderable.


## 15. Explain hydration in SSR.

Hydration = attaching React listeners to server-rendered HTML.

It:

- converts static HTML → interactive React app

- requires matching DOM on client and server

- mismatch causes hydration warnings


## 16. Explain the difference between useRef and useState.
Feature	useRef	useState
Triggers re-render?	❌ No	✔️ Yes
Stores?	Mutable value	State value
Use cases	DOM refs, timers, cached values	UI state

## How would you improve initial load time in React??

- Code splitting
- Lazy-loading routes
- Reduce bundle size
- Remove unused libraries
- Use CDN
- Preload critical assets
- Use image optimization
- Minimie CSS
- SSR + streaming
- Use RSC(next.js)

## 18. What is tree-shaking??
Tree shaking removes unused exports during bundling

Work best with:

- ES module 
- Pure functions
- Dead code elimination

## 19. How does React handles errors?

```
class ErrorBoundary extends React.Component {
  componentDidCatch(err) {}
}



```


Catches errors in:

render

lifecycle

constructors

Not in:

event handlers

async code


## 🧨 20. How do you detect render performance issues?

Use React Profiler:

<Profiler id="App" onRender={callback}>
  <App />
</Profiler>


Helps measure:

render time

wasted renders

interaction delays

## 21. Implement c custom debounce hook

```
function useDebounce (value, delay = 300){
    const[debounced, setDebounced] = useState(value);


    useEffect(()=>{
      const t = setTimeout(() => setDebounced(value), delay)
    }, [value])

    return debounced;
}


```

## 22. Implement a custom infinte scroll hook

```

function useInfiniteScroll(callback) {
  const observer = useRef();

  const lastElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) callback();
    });
    if (node) observer.current.observe(node);
  }, []);

  return lastElementRef;
}


```

## 20. Explain Rules of Hooks deeply

1. Only call hookcs
   - inside React component
   - or custom hook
2. Never inside :
   - loops 
   - conditions
   - nested functions

3. Hooks must run in same order each render
4. Prevent inconsitent state allocation

## 21 Why do keys matter in lists?

Keys:

identify elements uniquely

prevent unnecessary re-renders

preserve component state across moves

fix issues like input cursor jumps

Bad keys → performance + UI bugs.


## How do you profile a react app?

- React DevTool  profiler
- Performance tab
- Flame charts
- Web vitals
- Why Did you render

## When to use suspense + ErrorBoundary ?
When using
- Dynamic imports 
- Lazy loaded components
- Data loading frameworks
- Images
- Exteram resources


## What is concurrent mode ?
- Pause rendering 
- discard outdated renders
- avoid UI blocking
- priortize interactions
- use startTransition for non-urgent work

## Explain StartTransitions()
- Marks updates as non-urgent
- User interaction stay smooth

## Why do React lists sometime render slow??
- Missing keys
- Re-renders due to function recreation
- heavy components
- mutation of state
- deeply nested structure

## How do you optimize re-rendering child components?
- React.memo 
- useCallback
- useMemo
- split into granular components
- Avoid recreating object / functions

## How does react handle error?

-- Error boundaries catch
- render error -
- lifecycle errors
- effect errors

But not
- event handlers
- async callbacks
- server-side errors.

## Explain React server components (RSC)
- Servers-sider rendering without bundling into JS
- Fetching data on server
- Zero client JS for server components
- Streaming UI
- Drastically smaller bundles.


## What is code splitting & why is it important ?
Split  JS bundles using:
- dynamic import
- React.lazy

Benefits:
- smaller initial load
- faster FCP
- better Lighthouse score

## What is a render prop??
- A techniqu where a components receive a function as a props that return JSX

## 50. Difference between shallow rendering & full rendering in testing?

Shallow rendering:

- renders component without children

- Fast unit tests

Full rendering:

- Mounts DOM

- Better for integration tests

- Slower


## What problem does suspense solve?
 - Lazy loading
 - Data fetching
 - Assets loading
 - SSR streaming

## What happens during React commit phase ?

## How to prevent prop drilling?

- Context API
- Redux / Zustand / Recoil
- Custom stores with useSyncExternalStore
- Render props
- Composition

## Explain the difference between Context API and Redux.
Feature	Context	Redux
- Best for	Low-frequency updates	High-frequency state changes
- Performance	Poor (re-renders everything)	Optimized selector-based updates
- Devtools	❌ No	✔ Yes
- Boilerplate	low	medium

## What is hydration
= Hydration = attaching React event handlers to SSR-generated HTML

Challenges
- Mismactch erros
- Layout shift
- Blocking time
- Require deterministic markup

## Why is lifting stateup sometime bad


## Why does React sometimes re-render even if props didn’t change?

Causes:

- Parent re-renders
- Context updates
- Impure components
- New function/object references
- Missing memoization














