import {CartForm} from '@shopify/hydrogen';
import {Loader2, Ticket} from 'lucide-react';
import {useRef, useState} from 'react';
import type {CartApiQueryFragment} from 'storefrontapi.generated';

function CartDiscounts({
  discountCodes,
}: {
  discountCodes?: CartApiQueryFragment['discountCodes'];
}) {
  const [codeInput, setCodeInput] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const codes: string[] =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

  return (
    <div className="py-4 border-t border-gray-100">
      {codes.length > 0 && <div></div>}

      {/* discount input */}
      {codeInput ? (
        <UpdateDiscountForm discountCodes={codes}>
          {(fetcher) => {
            const isLoading = fetcher.state !== 'idle';

            return (
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    name="discountCode"
                    placeholder="Enter promo code"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-brand-navy text-sm"
                    disabled={isLoading}
                  />
                  {isLoading && (
                    <div className="absolute top-1/2 right-2 -translate-y-1/2">
                      <Loader2 className="animate-spin w-4 h-4 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className={`px-4 py-2 bg-brand-navy text-white rounded text-sm transition-colors duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-navyLight'}`}
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => setCodeInput(false)}
                    type="button"
                    className="px-4 py-2 border border-gray-200 hover:border-gray-300 rounded text-sm transition-colors duration-300"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            );
          }}
        </UpdateDiscountForm>
      ) : (
        <button
          onClick={() => setCodeInput(true)}
          className="inline-flex items-center gap-2 text-sm text-brand-gold hover:text-brand-goldDark transition-colors duration-300"
        >
          <Ticket className="w-4 h-4" />
          Add discount code
        </button>
      )}
    </div>
  );
}

function UpdateDiscountForm({
  discountCodes,
  children,
}: {
  discountCodes?: string[];
  children: React.ReactNode | ((fetcher: any) => React.ReactNode);
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

export default CartDiscounts;
