import { useEffect, useState } from 'react';
/*
 useLocalStorage has key parameter of type string, 2nd param is an initialValue of T (this represents a generic) or a function that returns a generic type(T)

 T is a generic type, it can be any type you want, the intialValue is either that type or a function that returns that type 
*/
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {

        // get value localstorage or get the initial value we passed in
        const jsonValue = localStorage.getItem(key)
        if (jsonValue !== null) return JSON.parse(jsonValue)

        //check if we dont have json value, we run initialValue() fn to get value from localstorage
        if (typeof initialValue === "function") {
            return (initialValue as () => T)()
        }
        return initialValue  // else we return the initialValue
    })

    useEffect(() => {
        // runs every time our key or value changes
        localStorage.setItem(key, JSON.stringify(value))
    },  [key, value])

    return [value, setValue] as [typeof value, typeof setValue] // [typeof value, typeof setValue] means value will always be type value/arrays of cartItems[], while setValue will be type of setValue / react set state function
    
}