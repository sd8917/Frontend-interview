import { useEffect, useState } from "react";

function PaginatedDat (){
    const [users, setUsers] = useState([]);

    const [page, setPage ] = useState(1);

    const pageSize = 10;

    useEffect(()=>{
        console.log("rendering... ")
        // jsonplaceholder uses _page and _limit query params for pagination
        fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageSize}`)
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(() => console.log("something went wrong"))
    }, [page]
    )

    console.log("USERS ",  users);

    return (
        <div>

            <h1>Server Pagination</h1>
            {
                users.map((u: any)=>(
                    <div key={u.id}>
                        <h4 key={u.id}>{u.title}</h4>
                        <p>{u.body}</p>
                        <hr />
                    </div>
                ))
            }

            <button onClick={()=> setPage(p => p -1)}>Prev</button>
            <button onClick={()=> setPage(p => p +1)}>Next</button>

        </div>
    )
}

export default PaginatedDat