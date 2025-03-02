import {GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from './../Firebase/Firebase.config';
import useAxiosPublic from "../Hooks/useAxiosPublic";


export const AuthContext = createContext(null)
const gitHubProvider = new GithubAuthProvider()
const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()
    const registerByFiled = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
   
    }
    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const gitHub = () => {
    setLoading(true)
    return signInWithPopup(auth, gitHubProvider)
    }
    const google = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const logout = () => {
        setLoading(true)
        return signOut(auth)
    }
    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, currentUser => {
            
            setUser(currentUser)
            if(currentUser) {
                axiosPublic.post('/jwt', {email: currentUser?.email})
                .then(res => {
                    if(res.data.token){
                       
                         localStorage.setItem('token', res.data.token)
                    }
                })
            } else {
                localStorage.removeItem('token')
            }
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    },[axiosPublic])
    const authInfo = {
        user,
        loading,
        registerByFiled,
        login,
        gitHub,
        google,
        logout
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;