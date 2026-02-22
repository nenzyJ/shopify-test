import { CartForm } from "@shopify/hydrogen";
import { Gift, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useFetcher } from "react-router";
import type { CartApiQueryFragment } from "storefrontapi.generated";

const CartGiftCard = ({
  giftCardCodes,
}: {
  giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
}) => {
  const [codeInput, setCodeInput] = useState<boolean>(false);
  const appliedGiftCardCodes = useRef<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const codes: string[] = giftCardCodes?.map(({lastCharacters}) => `****${lastCharacters}`) ?? [];
  const saveAppliedCode = (code: string) => {
    if (!inputRef.current) return;
    const formattedCode = code.replace(/\s/g, '');
    if (!appliedGiftCardCodes.current.includes(formattedCode)) {
      appliedGiftCardCodes.current.push(formattedCode);
    }
    inputRef.current.value = '';
    setCodeInput(false);
  };
   

  return (
    <div className="py-4 border-t border-gray-100">
      {codes.length > 0 && <div></div>}

      {/* discount input */}
      {codeInput ? (
        <AddGiftCardForm>
          {(fetcher) => {
            const isLoading = fetcher.state !== 'idle';

            return (
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    name="giftCardCode"
                    placeholder="Enter gift card code"
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
        </AddGiftCardForm>
      ) : (
        <button
          onClick={() => setCodeInput(true)}
          className="inline-flex items-center gap-2 text-sm text-brand-gold hover:text-brand-goldDark transition-colors duration-300"
        >
          <Gift className="w-4 h-4" />
          Add Gift Card
        </button>
      )}
    </div>
  );
}
function AddGiftCardForm({
  fetcherKey,
  children,
}: {
  fetcherKey?: string;
  children: React.ReactNode | ((fetcher: any) => React.ReactNode); /// fetcher 3:14
}) {
  return (
    <CartForm
      fetcherKey={fetcherKey}
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesAdd}
    >
      {children}
    </CartForm>
  );
}

function RemoveGiftCardForm({
  giftCardId,
  children,
}: {
  giftCardId: string;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesRemove}
      inputs={{
        giftCardCodes: [giftCardId],
      }}
    >
      {children}
    </CartForm>
  );
}
export default CartGiftCard;