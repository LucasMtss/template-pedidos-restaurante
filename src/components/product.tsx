import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProductDataProps {
    id: string | number;
    title: string;
    description: string;
    thumbnail: any;
    quantity?: number;
    price: number;
}

interface IProductProps {
    data: IProductDataProps;
    onClick?: () => void;
}


import ImageProduct from '../assets/products/thumbnail/marmitex.jpg'
import Refrigerante from '../assets/products/thumbnail/7.png'
import Suco from '../assets/products/thumbnail/suco.jpg'
import { formatCurrency } from "../utils/functions/format-to-currency";

const imagesMap: Record<string, any> = {
    'thumbnail1': ImageProduct,
    'thumbnail2': ImageProduct,
    'thumbnail3': ImageProduct,
    'thumbnail4': ImageProduct,
    'thumbnail5': ImageProduct,
    'thumbnail6': ImageProduct,
    'thumbnail7': ImageProduct,
    'thumbnail8': ImageProduct,
    'thumbnail9': ImageProduct,
    'thumbnail10': ImageProduct,
    'thumbnail11': Refrigerante,
    'thumbnail12': Suco,
};

export const Product = ({data, onClick}: IProductProps) => {
    const [thumbnail, setThumbnail] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        handleImportImage();
    }, [])

    function handleImportImage() {
        // Use a imagem estática se ela estiver disponível no mapa
        const image = imagesMap[`thumbnail${data.id}`];
        if (image) 
            setThumbnail(image);
    } 

    function handleRedirect(){
        navigate(`/product/${data.id}`)
    }

    return(
        <div className="flex w-full max-w-[100%] flex-row pb-4 items-end " onClick={ onClick ? onClick : handleRedirect}>
            <img src={thumbnail} className="w-20 h-20 rounded-md"/>
            <div className="flex-1 ml-3 h-full max-w-[100] overflow-hidden">
                <div className="flex-row items-center justify-between">
                <span className="text-slate-900 font-subtitle flex-1 ">{data.title}</span>
                {
                    data?.quantity && (
                        <span className="text--400 font-subtitle text-sm ml-2">X {data.quantity}</span>
                    )
                }
                </div>
                <div className="flex flex-col mt-1 w-full">
                    <span className="text-slate-400 text-xs leading-5 mt-0.5 text-ellipsis overflow-hidden text-nowrap w-full">{data.description}</span>
                    <span className="text-orange-500 text-xl leading-5 mt-0.5">{formatCurrency(data.price)}</span>
                </div>
            </div>
        </div>
    )
}