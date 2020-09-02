import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../services/apiClient'
import { string } from 'yup'

interface AuthState {
    token: string
    user: object
}

interface signInCredentials {
    email: string
    password: string
}

interface AuthContextData {
    user: object
    signIn(credentials: signInCredentials): Promise<void>
    signOut(): void
}

 const AuthContext = createContext<AuthContextData>({} as AuthContextData)

 const AuthProvider: React.FC = ({children}) => {

    const [data, setData] = useState<AuthState>(() => {
        const token =localStorage.getItem('@GoBarber:token')
        const user = localStorage.getItem('@GoBarber:token')

        if(token && user) {
            return { token, user: JSON.parse(user)}
        }

        return {} as AuthState
    
    })

    const signIn = useCallback(async ({email, password}) => {
        const response = await api.post('sessions', {
            email,
            password,
        })

        const { token, user } = response.data 

        localStorage.setItem('@GoBarber:token', token)
        localStorage.setItem('@GoBarber:token', JSON.stringify(user))
    
        setData({ token, user})
        

    }, [])

    const signOut = useCallback(() => {
        localStorage.removeItem('@GoBarber:token')
        localStorage.removeItem('@GoBarber:token')
        setData({} as AuthState)

    }, [])

    return (
        <AuthContext.Provider value={{user: data.user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextData {
    const context =  useContext(AuthContext)

    if(!context){
        throw new Error('UseAuth must be used within an authprovider')
    }

    return context
}

export {AuthProvider, useAuth}