import { Alert, StyleSheet, Text, View } from "react-native";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AppContextType {
  addedItems: Product[]; //this is the array that is storing the data that is added from the home list of items
  addItems: (data: Product) => void; // this is the function that will add the selected item to the array addedItems[]
  removeItems: (data: Product) => void; //this is the funxtion to delete the items from addedItems[]
  productList: Product[];//this is the array that is stroring all the prosducts stored in the API
  searchText: string;// this is the search text that the user is typing
  searchData: Product[];// this is the array that is storing the data that matches the search typed in
  setSearchText: (data: string) => void;
  setSearchData: (data: Product[]) => void;
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

  const addItems = (data: Product) => {
    setAddedItems((prevData) => [...prevData, data]);
    console.log("Product added!");
    Alert.alert("Product added!");
  };
  const removeItems = (data: Product) => {
    setAddedItems((prevData) => prevData.filter((item) => item !== data));
    console.log("Removed Product");
    Alert.alert("Product removed!");
  };
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
  useEffect(() => {
    theProducts();
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextAuth;

