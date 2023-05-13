import { useState,createContext,useContext, useEffect } from "react";
import { fetcMe } from "../../api";
import { Flex,Spinner } from "@chakra-ui/react";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loggedIn,setLoggedIn] = useState(false)
    const [loading,setLoading]  = useState(true)
    useEffect(() => {
        
        (async() => {
            try{
            const me = await fetcMe()
            setLoggedIn(true)
            setUser(me)
            setLoading(false)
        }catch(e) {
            setLoading(false)
        }
        })()
    }, [])


    const login = (data) => {
        setUser(data.user)
        setLoggedIn(true)
        localStorage.setItem("access-token", data.accessToken)
        localStorage.setItem("refresh-token", data.refreshToken)
    }

    const values = {
        login,
        setLoggedIn,
        user,
        setUser,
        loggedIn
    }

    if(loading) {
        return (
            <Flex justifyContent="center" alignItems="center" height="100vh" >
                <Spinner color="red.500" size="xl" thickness="4px" speed="0.5s" emptyColor="blue.200" />
            </Flex>
        )
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)