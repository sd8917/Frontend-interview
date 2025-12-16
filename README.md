## How do you detect performance problems?

- React DevTool profiler
- Check commit time
- Identify wasted render
- Chrome performance tab
- Measure interaction delays

```
<Profiler id="userList" onRender={callback}>
  <UserList>
</Profiler>

```


## Large List renders slowly(5k+ items)

Naive solution
- Use `React.memo`
- Use `useCallback`

List virtualization

- use  `react-window`
- render only visible rows
- DOM nodes reduced drastically

## Components re-render even when props dont changes

## Correct explaintation
- Parent re-render triggers child render
- New function reference
- New object/array created inline

## fix
```
const onClick = useCallback(()=>{
  handleClick(id);
}, [id])

const memoizeData = useMemo(()=>{
 data
}, [data])

```

```
export default React.memo(Component)

```

## User type in search box -> UI freezes

- How do you fix this without debouncing ?

```
const [isPending, startTransition] = useTransitoion();


const onSearch = (text) =>{
  startTransition(()=>{
    setResults(filter(text));
  })
}

```

React keeps input responsive

## Context cause entire app to re-renders

- Context slow here

- Context updates re-renders all consumers
- No selective subscrioption

-- fIX OPTION
- Split context
- Memoize provider value
- Use state libraries (Redux)

```
const value = useMemo (()=>{
user
}, [user])

``

## State update causes multiple re-renders

- React 18 batches states updates automatically
- Reduce re-renders
- Works in promises , timeout.

## Why not to optimize
- Always use memo and callbacks

- No performance measurement
- Small components
- Low frequency renders

- Over optimization increases memory usage

## How to reduce bundle size
- Code splitting i,e React.lazy
- Tree shaking
- Remove unused codes
- Dynamic imoorts

## What is React' fibre?
- Fiber is React's reconcillation enginer that 
- Increasemental rendering
- Pausing, resuming, aborting renders
- Prioritizing updates (user input > data > fetch)

Used heavily in concurrent rendering

## Difference between state and props??

State                      Props

mutalable                  Immutable
Managed by component       Passed from parent
Cause re-render            Causes re-render


## Why hooks were introduced?
- Avoid class complexity
- Share logic without HOC/render props
- Better composition
- Cleaner lifecycle handling

## How does react works internally??

React creates virtual DOM representation of UI

1. A new virtual DOM tree is created
2. React diff it with previous tree(Reconcillation)
3. Compute minimal updates
4. Applies them to the real DOM via the fiber architecutre
