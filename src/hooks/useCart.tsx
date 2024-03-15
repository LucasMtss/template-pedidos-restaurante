import { createContext, PropsWithChildren, ReactNode, useContext, useEffect, useState } from 'react';
import { ProductProps } from '../utils/data/products';

interface IIngredient {
  value: string;
  label: string;
}

interface ICartItem {
    product: ProductProps;
    quantity: number;
    ingredients: string[];
}

interface ICartContextProps {
    addToCart: (product: ProductProps, ingredients: IIngredient[]) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;
    numberOfItems: number;
    totalValue: number;
    cartItems: ICartItem[];
}

interface ICartContext {
    children: ReactNode;
}

const CartContext = createContext<ICartContextProps>({} as ICartContextProps);

export function CartProvider({ children }: PropsWithChildren<ICartContext>) {
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);
    const [numberOfItems, setNumberOfItems] = useState(0)
    const [totalValue, setTotalValue] = useState(0)

    useEffect(() => {
      const products = localStorage.getItem('@delivery/cartItems');
      if(products){
        const jsonCartItems: ICartItem[] = JSON.parse(products);
        setCartItems(jsonCartItems);
        setNumberOfItems(jsonCartItems.reduce((total, item) => total + item.quantity, 0));
        setTotalValue(jsonCartItems.reduce((total, item) => total + item.quantity * item.product.price, 0));
      }
    }, [])
  
    const addToCart = (product: ProductProps, ingredients: IIngredient[]) => {
      const existingItemIndex = cartItems.findIndex(item => item.product.id === product.id);
      let updatedCartItems = [...cartItems];
      if (existingItemIndex !== -1) {
        updatedCartItems[existingItemIndex].quantity += 1;
      } else {
        updatedCartItems = [...updatedCartItems, { product, ingredients: ingredients.map(item => item.value), quantity: 1 }];
      }
      setCartItems(updatedCartItems);
      setNumberOfItems(updatedCartItems.reduce((total, item) => total + item.quantity, 0));
      setTotalValue(updatedCartItems.reduce((total, item) => total + item.quantity * item.product.price, 0));
      localStorage.setItem('@delivery/cartItems', JSON.stringify(updatedCartItems));
    };
  
    const removeItem = (productId: string) => {
      let updatedCartItems = cartItems.map(item => {
        if(productId === item.product.id){
            return {
                ...item,
                quantity: item.quantity - 1
            }
        }
        return item;
      });
      updatedCartItems = updatedCartItems.filter(item => item.quantity > 0);
      setCartItems(updatedCartItems);
      setNumberOfItems(updatedCartItems.reduce((total, item) => total + item.quantity, 0));
      setTotalValue(updatedCartItems.reduce((total, item) => total + item.quantity * item.product.price, 0));
      localStorage.setItem('@delivery/cartItems', JSON.stringify(updatedCartItems));
    };

    const clearCart = () => {
      setCartItems([]);
      setTotalValue(0);
      setNumberOfItems(0);
      localStorage.removeItem('@delivery/cartItems');
    }
  

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeItem,
        numberOfItems,
        cartItems,
        totalValue,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): ICartContextProps {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('useAuth must be used within an CartProvider');
    }
    return context;
  }