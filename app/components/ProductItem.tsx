import React from 'react'
import { Link } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import type { ProductItemFragment } from 'storefrontapi.generated';
import { useVariantUrl } from '~/lib/variants';
import { ArrowRight } from 'lucide-react';
type ProductItemProps = {
  product: ProductItemFragment ;
  loading?: 'eager' | 'lazy';
  hidePrice?: boolean;
}
const ProductItem = ({product, loading, hidePrice }: ProductItemProps) => {

  const variant = product.variants.nodes[0];
  const variantUrl = useVariantUrl(product.handle, variant.selectedOptions)
  const secondImage = product.images?.nodes[1];
  return (
   <Link key={product.id} to={variantUrl} className='group block relative' prefetch='intent'>
   {/* image */}
    <div className='relative aspect-square overflow-hidden bg-brand-cream mb-6'>
      {product.featuredImage && (
        <>
          <Image
            alt={product.featuredImage.altText || product.title}
            data={product.featuredImage}
            loading={loading}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover w-full h-full transition-opacity duration-500 group-hover:opacity-0"
          />
          {secondImage && (
            <Image
              alt={secondImage.altText || product.title}
              data={secondImage}
              loading={loading}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="absolute inset-0 w-full object-cover opacity-0 h-full transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
          {/* overlay */}
          <div className='absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/20 transition-colors duration-500'/>

          <div className='absolute bottom-0 left-0 right-0 p-4 transform transition-transform translate-y-full group-hover:translate-y-0 ease-out duration-500'>
            <div className='bg-white/90 backdrop-blur-sm py-3 px-4 text-center'>
                <span>
                  View Details
                </span>
            </div>
          </div>
        </>
      )}    

      <div className='absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
      <div className='absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
      </div>
   {/* info */}
   <div className='relative '>
     <h4 className='text-lg text-brand-navy mb-2 group-hover:text-brand-gold transition-color duration-500'>
      {
        product.title
      }
      <div className='flex justify-between items-baseline'>
        {!hidePrice && (
          <Money data={product.priceRange.minVariantPrice} className='text-gray-600 group-hover:text-brand-navy transition-colors duration-500' />
        )}
        <span className='flex items-center text-sm text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
          Explore
          <ArrowRight className='ml-1 w-4 h-4' />
        </span>
      </div>
     </h4>
   </div>
   </Link>
  )
}

export const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    images(first: 2) {
      nodes {
        id
        altText
        url
        width
        height
      }
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        selectedOptions {
          name
          value
        }
      }
    }
  }
` as const;

export default ProductItem
