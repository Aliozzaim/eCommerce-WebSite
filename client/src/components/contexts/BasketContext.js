import { createContext, useContext, useEffect, useState } from "react";

const BasketContext = createContext()

const defaultBasket = JSON.parse(localStorage.getItem("basket")) || []

export const BasketProvider = ({children}) => {
    
    const [items,setItems] = useState(defaultBasket)

    useEffect(() => {
        localStorage.setItem("basket",JSON.stringify(items))
    },[items])

    const addItemtoBasket = (data,findItemBasket) => {
        if(!findItemBasket) {

        return    setItems((prev) => [...prev, data])
        }
        const filtered = items.filter((item) => item._id !== findItemBasket._id)
        setItems(filtered)
    }

    const removeFromBasket  = (item_id) => {
        const filtered = items.filter((item) => item._id !== item_id)
        setItems(filtered)
    }

    
    

    const values = {
        items,
        setItems,
        addItemtoBasket,
        removeFromBasket
        
    }

    return <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
}
export const useBasket = () => useContext(BasketContext)