import {CartForm, type OptimisticCartLineInput} from '@shopify/hydrogen';
import { Check, Loader2, ShoppingBag } from 'lucide-react';
import {useEffect, useRef, useState} from 'react';

export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
  afterAddCart,
}: {
  analytics?: unknown;
  children: React.ReactNode;
  disabled?: boolean;
  lines: Array<OptimisticCartLineInput>;
  onClick?: () => void;
  afterAddCart?: () => void;
}) {
  // Track whether we already fired afterAddCart for the current submission
  const firedRef = useRef(false);
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (addedToCart) {
      timeout = setTimeout(() => {
        setAddedToCart(false);
      }, 2500);
    }
    return () => clearTimeout(timeout);
  }, [addedToCart]);

  return (
    <CartForm
      inputs={{lines}}
      route="/cart"
      action={CartForm.ACTIONS.LinesAdd}
    >
      {(fetcher) => {
        const isLoading = fetcher.state !== 'idle';

        // Reset the guard each time a new submission starts
        if (fetcher.state === 'submitting') {
          firedRef.current = false;
        }

        // Fire afterAddCart exactly once when the request succeeds
        if (
          fetcher.state === 'idle' &&
          fetcher.data &&
          !fetcher.data.errors &&
          !firedRef.current
        ) {
          firedRef.current = true;
          setAddedToCart(true);
          afterAddCart?.();
        }

        return (
          <>
            <input
              name="analytics"
              type="hidden"
              value={JSON.stringify(analytics)}
            />
            <button
              type="submit"
              onClick={onClick}
              disabled={disabled ?? isLoading}
              className={`w-full md:w-auto cursor-pointer py-4 px-8 text-white font-source text-base tracking-wider transition-all duration-300 ease-in-out flex items-center justify-center gap-3 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-white/10 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 disabled:before:hidden bg-brand-navy hover:bg-brand-navyLight disabled:bg-brand-gray disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <>
                 <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Adding to Cart</span>
                </>
              ) :addedToCart ? (
                <>
                <Check className="w-5 h-5" />
                <span className="font-medium">Added to Cart</span>
                </>
              ) : (
                <>
                <ShoppingBag className="w-5 h-5" />
                <span className="font-medium">{children}</span>
                </>
              )}
            </button>
          </>
        );
      }}
    </CartForm>
  );
}
