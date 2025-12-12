## 1. Why does a component re-render when its parent re-renders?

- Because react follows top-downrendering. when a parent renders, react re-invoke child componnents unless it can safely skipp them

```
function Parent (){
    const [count, setCount] = useState(0);

    return <Child />;
}
```

Event if Child doesn't use `count`, it still re-renders.

How to prevent 
- React.memo
- Stable props (useCallback, useMemo)
- Component splitting

```
const Child = React.memo(() => {
  console.log("Child render");
  return <div>Child</div>;
});


```

## ```useCallback``` when is it useless??

- Passing callbacks to memoized childres
- or Dependency stability matters.

```
const handleClick = useCallback(()=>{
    setCount(c => c + 1);
}, [])

```

👉 Interview gold:

useCallback prevents re-creation, not re-rendering.

## What is concurrent rendering

- Pause rendering
- Prioritize updates
- resume later

This improves UX responsiveness

## ```useTransition``` real examples

- Keep the UI responsive
- Prevent blocking renders
- Prioritize urgent updates (like typing) over expensive updates (like filtering large data)

- Urgent updated -> high priority
- No urgent -> low priority




