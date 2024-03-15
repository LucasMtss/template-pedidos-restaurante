import { useEffect, useState } from 'react';
import { Header } from '../components/header'
import { Product } from '../components/product'
import { useCart } from '../hooks/useCart';
import {MENU} from '../utils/data/products'
import { getWeekDay } from '../utils/functions/get-week-day';

export function Home() {
  const {numberOfItems} = useCart();
  const [weekDay, setWeekDay] = useState('');

  useEffect(() => {
    setWeekDay(getWeekDay());
  }, []);

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6 px-5'>
      <Header title='Escolha seu pedido' cartQuatityItems={numberOfItems}/>
      {
        MENU.map(section => {
          return (
            <div className='w-full pl-5'>
              <h4 className='text-slate-900 text-xl font-bold mb-3'>{section.title}</h4>
              {
                section.data.map(product => {
                  if(section.title === 'Cardápio do dia'){
                    if(product.title === weekDay) return <Product data={product}/>
                    else return (<></>);
                  }
                  else
                    return <Product data={product}/>
                })
              }
            </div>
          )
        })
      }
      
    </div>
  )
}