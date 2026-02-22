import type {CartApiQueryFragment} from 'storefrontapi.generated';
import type {CartLayout} from './CartMain';
import {Money, type OptimisticCart} from '@shopify/hydrogen';
import {CreditCard, Gift} from 'lucide-react';
import CartDiscounts from './CartDiscount';
import CartGiftCard from './GiftCards';

type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
};

export function CartSummary({cart, layout}: CartSummaryProps) {
  // const className =
  //   layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';

  return (
    <div className="bg-white px-6 py-8">
      <div className="flex items-center justify-between mb-4">
        <span className="font-source text-gray-500"> Subtotal</span>
        <span className="font-medium">
          {cart?.cost?.subtotalAmount?.amount ? (
            <Money data={cart.cost.subtotalAmount} />
          ) : (
            '$0.00'
          )}
        </span>
      </div>
      <CartDiscounts discountCodes={cart.discountCodes} />

      {/* gift cards */}
      <CartGiftCard giftCardCodes={cart.appliedGiftCards} />

      {/* extra info */}
      <div className=" mt-8 space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Gift className="w-4 h-4" />
          <span>Complimentary gift card</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CreditCard className="w-4 h-4" />
          <span>Secure checkout by Shopify</span>
        </div>
      </div>
    </div>
  );
}

function CartCheckoutActions({checkoutUrl}: {checkoutUrl?: string}) {
  if (!checkoutUrl) return null;

  return (
    <div>
      <a href={checkoutUrl} target="_self">
        <p>Continue to Checkout &rarr;</p>
      </a>
      <br />
    </div>
  );
}
