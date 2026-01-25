## memo
React.memo is a highorder component that prevent unnecessary re-render of a components if props haven't changes (shallow comparison).

Now:
- Typing updates Parent
- Child does NOT re-render


Q2. Difference between React.memo and useMemo?

👉 React.memo memoizes a COMPONENT
👉 useMemo memoizes a VALUE

```
const value = useMemo(() => compute(), []);
const Comp = React.memo(MyComponent);

```

## when should you avoid React.memo?
❌ Frequently changing props
Because overhead > benefit.



