import React,{createContext, useState} from 'react'
import app from '../firebase/base'
export const AuthContext = createContext();

export const AuthProvider = ({children,navigation}) => {
    const [user, setUser] = useState(null)
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async(email, password) => {
                    try {
                        
                         await   app.auth().signInWithEmailAndPassword(email,password)
                    } catch (error) {
                        console.log(error)
                        
                    }
                },
                register: async(email, password) => {
                    try {
                         await   app.auth()
                                    .createUserWithEmailAndPassword(email,password)
                                    .then(() => navigation.navigate('Register'))
                       } catch (error) {
                        console.log(error)
                        
                      }
                },
                logout: async() => {
                    try {
                         await   app.auth().signOut()
                    } catch (error) {
                        console.log(error)
                    }
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
