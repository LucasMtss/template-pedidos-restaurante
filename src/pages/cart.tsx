
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/header";
import { Button } from "../components/button";
import { useCart } from "../hooks/useCart";
import { Product } from "../components/product";
import { formatCurrency } from "../utils/functions/format-to-currency";
import * as Dialog from '@radix-ui/react-alert-dialog'
import { ProductProps } from "../utils/data/products";
import { toast } from 'sonner'
import { Input } from "../components/input";
import { TextArea } from "../components/textArea";
import { Dropdown } from "../components/dropdown";

const PHONE_NUMBER = '5532991864842'

export default function Cart(){
    const [zipcode, setZipcode] = useState('');
    const [street, setStreet] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('PIX');
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<null | ProductProps>(null)
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {cartItems, totalValue, removeItem, clearCart} = useCart();

    const paymentMethpodOptions = ['PIX', 'Débito', 'Crédito', 'Dinheiro']

    async function handleFindAddress() {
        setIsLoading(true);
        const response = await fetch(`https://viacep.com.br/ws/${zipcode}/json/`);
        const body = await response.json();
        if(body.erro) toast.error('CEP inválido');
        setDistrict(body.bairro);
        setStreet(body.logradouro);
        setCity(body.localidade);
        setIsLoading(false);
    }

    function validateFields(){
        if(!zipcode.length){
            toast.error('Informe o CEP');
            return false;
        }
        if(!district.length){
            toast.error('Informe o bairro');
            return false;
        }
        if(!street.length){
            toast.error('Informe a rua');
            return false;
        }
        if(!city.length){
            toast.error('Informe a cidade');
            return false;
        }
        if(!number.length){
            toast.error('Informe o número');
            return false;
        }
        if(!name.length){
            toast.error('Informe o seu nome');
            return false;
        }
        return true;
    }

    function handleRemoveItem(){
        if(!selectedItem) return;
        removeItem(selectedItem.id);
        setOpen(false);
        toast.success('Item removido do carrinho!');
    }

    function handleSelectItem(item: ProductProps){
        setOpen(true);
        setSelectedItem(item);
    }

    function handleCancelRemoveItem(){
        setOpen(false);
        setSelectedItem(null);
    }

    function handleSendOrder(){
        if(!validateFields()) return;
        const baseUrl = `https://wa.me/%2B${PHONE_NUMBER}?text=`;
        let message = `Olá, meu nome é ${name} e gostaria de fazer um pedido:\n`;

        cartItems.forEach(item => {
            message += `\t${item.quantity}x ${item.product.title}\n${item.ingredients.join(', ')}\n`;
        })

        message += `\nTotal: ${formatCurrency(totalValue)}`;
        message += `\nForma de pagamento: ${paymentMethod}\n`;
        message += '\n--------------------------------------\n';

        message += `\nEntrega no endereço: ${street}, ${number}, ${district} - ${city} CEP: ${zipcode}`
        if(complement.length)
            message += `\ncomplemento ${complement}`
        if(notes.length)
            message += `\n\nObservações do pedido: ${notes}`

        window.open(baseUrl + encodeURI(message), '_blank')
        
        toast.success('Pedido enviado com sucesso')
        clearCart();
        navigate('/');
    }

    return (
        <div className="flex-1 pt-8 max-w-[1200px] mx-auto min-h-[100vh] h-full flex justify-between flex-col">
             <Dialog.Root open={open} onOpenChange={setOpen}>
            
            <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-gray-100'/>
                <Dialog.Content className='overflow-hidden fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:h-[60vh] md:max-w-[640px] w-full bg-gray-100 md:rounded-md flex flex-col outline-none'>
                    <div className="flex flex-1 justify-between flex-col">
                    <h1 className="w-full text-center text-2xl sm:mt-5 mt-10">Deseja excluir esse item?</h1>
                    <div  className="flex justify-end gap-5 py-3 px-3 flex-col">
                        <Button title="Excluir" onClick={() => handleRemoveItem()}/>
                        <Button title="Cancelar" transparent onClick={handleCancelRemoveItem}/>
                    </div>
                    </div>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
            <Header title="Seu Carrinho"/>
            {
                cartItems.length ? (
                    <div className="flex-1 flex flex-col justify-between">
                        <div className="">
                            <div>
                                <div className="p-5 flex-1">
                                    <div className="max-h-[50vh] overflow-y-scroll w-full no-scrollbar">
                                        {
                                            cartItems.map(item => {
                                                return (
                                                    <div className="border-b border-slate-700 mb-2">
                                                        <Product onClick={() => handleSelectItem(item.product)} key={item.product.id} data={{...item.product, quantity: item.quantity}} />
                                                        <ul className="pl-3 mb-2">
                                                        {item.ingredients?.map(ingredent => (<li>* {ingredent}</li>))}

                                                        </ul>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="flex flex-row gap-2 items-center mt-5 mb-4">
                                        <span className="text-slate-900 text-xls font-subtitle">Total:</span>
                                        <span className="text-orange-500 text-2xl font-heading">{formatCurrency(totalValue)}</span>
                                    </div>
                                    <div className="sm:flex-row sm:items-end flex-col flex items-start gap-5 max-w-[600px]">
                                        <Input maxLength={8} numericOnly onChangeValue={e => setZipcode(e)} value={zipcode} label="Informe o CEP do endereço de entrega"/>
                                        <Button isLoading={isLoading} title="Buscar endereço" onClick={handleFindAddress}/>
                                    </div>
                                    <div className="flex gap-5 flex-wrap justify-between">
                                        <div className="sm:w-[48%] w-full">
                                            <Input label="Cidade" value={city} onChangeValue={e => setCity(e)}/>
                                        </div>
                                        <div className="sm:w-[48%] w-full">
                                            <Input label="Bairro" value={district} onChangeValue={e => setDistrict(e)}/>
                                        </div>
                                        <div className="sm:w-[48%] w-full">
                                            <Input label="Rua" value={street} onChangeValue={e => setStreet(e)}/>
                                        </div>
                                        <div className="sm:w-[48%] w-full">
                                            <Input numericOnly label="Número" value={number} onChangeValue={e => setNumber(e)}/>
                                        </div>
                                        <div className="sm:w-[48%] w-full">
                                            <Input onChangeValue={e => setComplement(e)} label="Complemento (Opcicioal)" value={complement}/>
                                        </div>
                                        <div className="sm:w-[48%] w-full">
                                            <Input onChangeValue={e => setName(e)} label="Seu nome" value={name}/>
                                        </div>
                                        <div className="sm:w-[48%] w-full">
                                            <Dropdown options={paymentMethpodOptions} onChangeValue={e => setPaymentMethod(e)} label="Forma de pagamento" value={paymentMethod}/>
                                        </div>
                                        <div className="sm:w-[48%] w-full">
                                            <TextArea onChangeValue={e => setNotes(e)} label="Observações do pedido" value={notes}/>
                                        </div>

                                    </div>
                                </div>  
                            </div>
                        </div>
                        <div className="p-5 gap-5 flex flex-col">
                            <Button isLoading={isLoading} title="Enviar pedido" onClick={handleSendOrder}/>
                            <Button title="Voltar ao cardápio" transparent onClick={() => navigate('/')}/>
                        </div>
                    </div>
                ) : (
                    <div className="pb-4 justify-between flex flex-col">
                    <span className="font-body text-slate-400 text-center my-8">Seu carrinho está vazio!</span>
                    <Button title="Voltar ao cardápio" onClick={() => navigate('/')}/>
                    </div>
                    )
            }
        </div>
    )
}