import { useEffect, useState } from "react";
import { MENU, PRODUCTS, ProductProps } from "../utils/data/products";

import { formatCurrency } from "../utils/functions/format-to-currency";
import {useLocation, redirect, useNavigate} from 'react-router-dom'
import { Button } from "../components/button";
import { useCart } from "../hooks/useCart";
import { toast } from "sonner";
import Select from 'react-select'

import ImageProduct from '../assets/products/cover/marmitex.jpg'
import Refrigerante from '../assets/products/cover/7.png'
import Suco from '../assets/products/cover/suco.jpg'
import { getWeekDay } from "../utils/functions/get-week-day";

const imagesMap: Record<string, any> = {
    'cover1': ImageProduct,
    'cover2': ImageProduct,
    'cover3': ImageProduct,
    'cover4': ImageProduct,
    'cover5': ImageProduct,
    'cover6': ImageProduct,
    'cover7': ImageProduct,
    'cover8': ImageProduct,
    'cover9': ImageProduct,
    'cover10': ImageProduct,
    'cover11': Refrigerante,
    'cover12': Suco,
};

interface ISelectOptions {
    value: string;
    label: string;
}

export default function ItemDetails(){
    const [product, setProduct] = useState<ProductProps>();
    const [cover, setCover] = useState<any>(null);
    const [options, setOptions] = useState<ISelectOptions[]>([]);
    const [selectedIngredents, setSelectedIngredients] = useState<ISelectOptions[]>([]);
    const { pathname } = useLocation();
    const navigate = useNavigate()
    const {addToCart} = useCart();

    
    useEffect(() => {
        getId();
    }, [])

    function getId() {
        
        const path = pathname.split('/');
        const id = path[path.length -1]

        const product = PRODUCTS.find(item => item.id === id);
        if(!product){
            redirect('/');
        }

        setProduct(product);
        handleImportImage(id);
        const weekDay = getWeekDay();
        const menu = MENU.find(section => section.title === 'Cardápio do dia')?.data.find(day => day.title === weekDay);
        
        if(menu){
            setOptions(menu.ingredients.map(ingredient => ({value: ingredient, label: ingredient})));
        }
    }

    function handleImportImage(id: string) {
        const image = imagesMap[`cover${id}`];
        if (image) 
            setCover(image);
    } 
    
    function handleAddToCart(){
        if(!product) return;
        addToCart(product, selectedIngredents);
        toast.success('Item adicionado no carrinho!');
        
    }

    return (
        <div className="flex-1 max-w-[800px] mx-auto">
            <img src={cover} className="max-h-[50vh] bg-cover mx-auto" />
            <div className="flex flex-col p-5 mt-2 flex-1">
                <h2 className="text-slate-900 text-2xl font-heading">{product?.title}</h2>
                <span className="text-orange-500 text-2xl font-heading my-2">{formatCurrency(product?.price ?? 0)}</span>
                <span className="text-slate-400 font-body text-base leading-6 mb-6">{product?.description}</span>
                {
                    product?.ingredients.map(ingredient => (
                        <span key={ingredient} className="text-slate-400 font-body text-base leading-6">{"\u2022"} {ingredient}</span>
                    ))
                }
            </div>
            <div className="p-5">
                <Select isSearchable={ false } onChange={e => setSelectedIngredients(e as ISelectOptions[])} placeholder="Monte seu marmitex" isMulti options={options} />
            </div>

            <div className="p-5 pb-8 gap-5 flex flex-col">
                {!product?.ingredients.length && (
                    <Button title="Adicionar ao pedido" onClick={handleAddToCart}/>
                )}
                <Button title="Voltar" transparent onClick={() => navigate('/')}/>
               
            </div>
        </div>
    )
}