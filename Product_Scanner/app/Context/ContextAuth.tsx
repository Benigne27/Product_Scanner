import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, ReactNode, useContext, useState } from 'react'

interface AppContextType{
    addedItems: string[], //this is the array that is storing the data that is added from the home list of items
    addItems: (data:string)=>void,// this is the function that will add the selected item to the array addedItems[]
    removeItems:(data:string)=>void//this is the funxtion to delete the items from addedItems[]
}

const AppContext= createContext<AppContextType|undefined>(undefined)

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
      throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
  };

interface AppProviderProps{
    children:ReactNode
}

const ContextAuth = ({children}: AppProviderProps) => {
    const [addedItems, setAddedItems]=useState<string[]>([])

    const addItems=(data:string)=>{
        setAddedItems((prevData)=>[...prevData,data])
    }
    const removeItems=(data:string)=>{
        setAddedItems((prevData)=> prevData.filter(item=> item!==data))
    }


  return (
    <AppContext.Provider value={{addedItems, addItems,removeItems}}>
        {children}
    </AppContext.Provider>
  )
}

export default ContextAuth

const styles = StyleSheet.create({})