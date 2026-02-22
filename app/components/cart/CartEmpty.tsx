import { useAside } from "../Aside";
import {Link} from 'react-router';
import type { CartMainProps } from "./CartMain";
import { ArrowRight, ShoppingBag } from "lucide-react";

const CartEmpty = ({
  hidden = false,
}: {
  hidden: boolean;
  layout?: CartMainProps['layout'];
}) => {
  const {close} = useAside();
  if(hidden){
    return null;
  }
  return (
    <div hidden={hidden} className={`flex flex-col items-center justify-center text-center h-full p-6`}>
        <div className="relative mb-8">
           <div className="absolute inset-0 bg-brand-cream rounded-full scale-[1.8] blur-xl opacity-50"/>
           <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-brand-cream">
            <ShoppingBag className="w-8 h-8 text-brand-navy"/>
           </div>
        </div>

        <div className="max-w-md space-y-4">
            <h2 className="text-2xl font-bold text-brand-navy">Your cart is empty</h2>
            <p className="text-source text-gray-500 leading-relaxed">Looks like you haven't added anything yet. Let's get you started!</p>
        </div>
      {/* Primary CTA */}
        <Link to="/collections/all" onClick={close} prefetch="intent" className="inline-flex items-center justify-center px-8 py-4 mt-6 bg-brand-navy text-white font-medium hover:bg-brand-light-navy transition-all duration-300">
        Explore Products
        <ArrowRight className="w-5 h-5 ml-2"/>
        </Link>
        
      {/* Collections All */}
      <div className="pt-8 space-y-3 border-t border-gray-100 mt-8">
        <p className="font-source text-sm text-gray-400 uppercase tracking-wide">Featured Products</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link
          to="/collections/all"
          onClick={close}
          prefetch="intent"
          className="text-brand-gold hover:text-brand-goldDark transition-colors duration-300"
          >
          View All
          </Link>
        </div>
      </div>
      {/* Contacts */}
      <div className="text-sm text-gray-500 pt-6">
        <p className="font-source">
          Need help? <a href="mailto:atelier@nenzy.com" className="text-brand-gold hover:text-brand-goldDark transition-colors duration-300">Contact us</a>
        </p>

      </div>
    </div>
  );
}
export default CartEmpty;