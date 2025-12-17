##🔹 ROUND 1: JavaScript + Web Fundamentals

### Question:
- What is a closure? Explain with a real-world example.

A closure is created when a function remembers variables from its leexical scope event after the outer function has finished execution

```

function counter () {
  let counter = 0;

  return function (){
    count++;
    return count;
  }

}

```


## Why react Re-render Happens ?

React re-renders when
- state changes
- Props changes
- Parent re-renders

```
React.memo(Component) // prevent unneccasary renders.

```

## 2️⃣ useEffect Pitfalls

```
useEffect(() => {
  fetchData();
}, []); // runs once

```

- Missing dependencies - Stale closure bug.

## 3️⃣ Controlled vs Uncontrolled Inputs

```

// Controlled
<input value={value} onChange={e => setValue(e.target.value)} />

// Uncontrolled
<input ref={inputRef} />


```

### When to use uncontrolled?
- File inputs
- Large forms
- Performance sensitive forms

4️⃣ useRef Use Cases

- Access DOM
- Persist value without re-render
- Previous state tracking

```
const prev = useRef()

useEffect(()=>{
  prev.current = value;
});

```

##🔹 ROUND 3: MACHINE CODING (90 min)

Problem 1: File Upload with Progress (Very Common)

```
const uploadFile = () => {
  const xhr = new XMLHttpRequest();
  xhr.upload.onprogress = (e) => {
    setProgress((e.loaded / e.total) * 100);
  };
  xhr.open("POST", "/upload");
  xhr.send(file);
};

```

🧠 Problem 3: Drag & Drop List

🧠 Problem 2: Pagination + Search Table


## 🔹 ROUND 4: SYSTEM DESIGN + DEVOPS + BEHAVIORAL
1️⃣ Design a Simple Dashboard App

Expected points

- React frontend
- REST API
- Auth (JWT)
- Pagination
- Caching

## Caching strategy


## Pagination strategy


## Difference between let vs var vs coonst

`var`   function scoped

`let`   block scoped

`const` block scoped


## Primitive vs Non-Premitive

Primitive 
`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`

Non primitive
`object`, `array`, `function`

#### 🧠 Senior insight:
Primitives are copied by value, objects by reference.

if(NaN){
  
}

## What is event delegation >
- Handling events at a parent using bubbling instead of mutiple child listener

## Why use it?
- Performance + dynamic elements

## Does React need delegation ?
- React already uses it internally, but manual delegration is useful for complex UIs.

## 5️⃣ React Internals (🔥 Interview Gold)
React already uses event delegation internally.

- React attaches one listener at the root
- Uses SyntheticEvent
- Improves performance

## 4️⃣ Real-world Use Cases

✅ Table row click
✅ Dropdown menu items
✅ Infinite lists
✅ Chat messages
✅ Forms with dynamic fields


