import { Alert, StyleSheet, Text, View } from "react-native";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import FlashMessage, {showMessage, hideMessage} from 'react-native-flash-message'
import * as SecureStore from 'expo-secure-store'

interface AppContextType {
  addedItems: Product[]; //this is the array that is storing the data that is added from the home list of items
  addItems: (data: Product) => void; // this is the function that will add the selected item to the array addedItems[]
  removeItems: (data: Product) => void; //this is the funxtion to delete the items from addedItems[]
  productList: Product[];//this is the array that is stroring all the prosducts stored in the API
  searchText: string;// this is the search text that the user is typing
  searchData: Product[];// this is the array that is storing the data that matches the search typed in
  setSearchText: (data: string) => void;
  setSearchData: (data: Product[]) => void;
  isAuthenticated: boolean
  login:()=>void
  logout:()=>void
  totalAmount: number, 
  username: string|null,
  setUsername: (username: string)=> void
}

export interface Product {
  id: number;
  image: ImageData;
  item_name: string;
  selling_price: number;
  category: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

const ContextAuth = ({ children }: AppProviderProps) => {
  const [addedItems, setAddedItems] = useState<Product[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [searchData, setSearchData] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [totalAmount, setTotalAmount]=useState<number>(0)
  const [username, setUsername]= useState<string|null>(null)

  const login = () => {
    if(username){
      setIsAuthenticated(true);
    } 
  }
  const logout = async() => {
    await SecureStore.deleteItemAsync('username')
    setUsername('');
    setIsAuthenticated(false)
  }

  const getUsername=async()=>{
    const loggedUsername= await SecureStore.getItemAsync('username')
    if (loggedUsername) setUsername(loggedUsername)
  }

  

  const addItems = (data: Product) => {
    setAddedItems((prevData) => {
      const allItems=[...prevData, data]
      ProductTotalAmount(allItems)
      SecureStore.setItemAsync('addedItems', JSON.stringify(allItems))
      return allItems
    }
      );
    console.log("Product added!");
    showMessage({
      message:'Product added!',
      type:'success'
    })
  };
  const removeItems = (data: Product) => {
    setAddedItems((prevData) => {
      const allItems=prevData.filter((item) => item !== data)
      ProductTotalAmount(allItems)
      SecureStore.setItemAsync('addeeItems', JSON.stringify(allItems))
      return allItems
    });
    console.log("Removed Product");
    showMessage({
      message:'Product removed!',
      type:'success'
    })
  };

  const getAddedItems=async()=>{
    const theAddedItems= await SecureStore.getItemAsync('addedItems')
    if (theAddedItems){
      setAddedItems(JSON.parse(theAddedItems))
    }
  }
  

  const ProductTotalAmount=(data: Product[])=>{
    const amount= data.reduce((sum, item)=> sum+ item.selling_price, 0)
    setTotalAmount(amount)
  }
  const theProducts = () => {
    fetch("https://inventory2-drpa.onrender.com/stocks/")
      .then((response) => response.json())
      .then((response) => {
        setProductList(response);
        console.log(response);
      })
      .catch((error) => console.error(error));
  };

  
  console.log(addedItems);

  const Searching = () => {
    if (searchText.length > 0) {
      const filtering = productList.filter((item) => {
        return item.item_name.toLowerCase().includes(searchText.toLowerCase());
      });
      setSearchData(filtering);
    } else {
      setSearchData([]);
    }
  };

  useEffect(()=>{
    theProducts();
    getUsername()
    getAddedItems()
  }, [])

  useEffect(() => {
    Searching();
  }, [searchText]);

  return (
    <AppContext.Provider
      value={{
        addedItems,
        addItems,
        removeItems,
        productList,
        searchText,
        searchData,
        setSearchText,
        setSearchData,
        isAuthenticated,
        login,
        logout,
        totalAmount,
        username,
        setUsername
        
      }}
    >
      <FlashMessage/>
      {children}
    </AppContext.Provider>
  );
};

export default ContextAuth;

