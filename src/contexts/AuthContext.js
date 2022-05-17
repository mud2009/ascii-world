import React, { useContext, useEffect, useState } from 'react'
import { auth } from "./../firebase"

const AuthContext = React.createContext()

export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState()
  const [loading , setLoading] = useState(true)

  function signUp(email, password){
    return auth.createUserWithEmailAndPassword(email, password)
  }
  
  function logIn(email, password){
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logOut(){
    return auth.signOut()
  }

  function updateEmail(email){
    return currentUser.updateEmail(email)
  }

  function updatePass(password){
    return currentUser.updatePassword(password)
  }

  function updateDisplayName(displayName){
    return currentUser.updateProfile({displayName : displayName})
  }
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })  
    return unsubscribe
  }, [])


  const value = {
    currentUser,
    signUp,
    logIn,
    logOut,
    updateEmail,
    updatePass,
    updateDisplayName
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}