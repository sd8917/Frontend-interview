import { useEffect, useState } from "react"

type roles = {
  ADMIN: "admin",
  USER: "user",
  TEACHER: "teacher"
};

export const useRole = (roles: roles) => {

    // check for role

    const [isAccessible, setIsAccessible]  = useState(false);

    useEffect(()=>{
        if(roles.include("Admin"))
        {
            setIsAccessible(true)
        }
       
    }, [roles]);


    return 

}