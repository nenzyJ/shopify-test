import { CartForm } from '@shopify/hydrogen';
import { X } from 'lucide-react';
import React from 'react'

type CartLineRemoveButtonProps = {
    lineids: string[];
    disabled: boolean;
}
const CartLineRemoveButton = (props: CartLineRemoveButtonProps) => {
  return (
    <CartForm route='/cart' action={CartForm.ACTIONS.LinesRemove} inputs={{lineIds: props.lineids}}>
        <button className={`ml-3 text-gray-400 hover:text-gray-500 transition-colors ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={props.disabled}>
            <X className='w-4 h-4' />
        </button>
    </CartForm>
  )
}

export default CartLineRemoveButton
