import {CartForm} from '@shopify/hydrogen';
import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
import {Loader2} from 'lucide-react';
import React, {useState, useEffect} from 'react';

type CartLineUpdateProps = {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
};

const CartLineUpdateButton = ({children, lines}: CartLineUpdateProps) => {
  const [updating, setUpdating] = useState<boolean>(false);

  const CartFormCallback = ({fetcher}: {fetcher: any}) => {
    useEffect(() => {
      if (fetcher.state === 'loading') {
        setUpdating(true);
      } else if (fetcher.state === 'idle') {
        setTimeout(() => setUpdating(false), 300);
      }
    }, [fetcher.state]);
    if (updating) {
      return (
        <div className="relative inline-flex items-center justify-center">
            <div className='opacity-50 pointer-events-none'>
                {children}
            </div>
          <div className='absolute inset-0 flex items-center justify-center'>
            <Loader2 className="animate-spin w-4 h-4 text-brand-gold" />
          </div>
        </div>
      );
    }

    return children;
  };

  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {(fetcher) => <CartFormCallback fetcher={fetcher} />}
    </CartForm>
  );
};

export default CartLineUpdateButton;
