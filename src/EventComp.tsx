
const EventComp = () => {


    const clickHandler1 = (e:any) => {
        e.stopPropagation();
        console.log("clicked 1")
    }

    const clickHandler2 = () => {
        
        console.log("clicked 2")
    }


    const clickHandler3 = (e:any) =>{
        console.log('Clicked 3')
    }

    return (
        <div>

            <div onClick={clickHandler3}>
               <p>Main div</p> 
                <p onClick={clickHandler1} style={{ border: "2px solid red", padding: '10px' }}>
                    <button onClick={clickHandler2} style={{ backgroundColor: "green", padding: '20px' }}></button>
                </p>
            </div>
        </div>
    )
}

export default EventComp

/*
What happens when you click the button?
🔹 Step-by-step flow (React synthetic events)

- Click happens on button
- clickHandler2 runs
- Event bubbles up to parent <p>
- clickHandler1 runs

== Events propagate from child → parent unless stopped.


*/
