import {Await, useLoaderData, Link} from 'react-router';
import type {Route} from './+types/_index';
import {Suspense} from 'react';
import {Image} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import ProductItem, { PRODUCT_ITEM_FRAGMENT } from '~/components/ProductItem';
import {ArrowRight, Star} from 'lucide-react';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: Route.LoaderArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error: Error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      {/* hero */}
      <section className="relative h-screen main-h-[600px] bg-brand-navy">
        <Image
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          loading="eager"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 3vw"
          data={{
            url: '/image/handmade-shoes-boots.webp',
            width: 1920,
            height: 1080,
          }}
        />
        <div className="relative max-w-[1440px] w-full mx-auto px-4 h-full flex items-center">
          <div className="max-w-2x">
            <h1 className="text-4xl md:text-6xl text-white mb-6">
              Discover Unique Handmade Crafts
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              Explore our curated collection of artisanal products
            </p>
            <Link
              to="/collections"
              className="items-center font-medium inline-flex px-8 py-4 bg-brand-gold hover:bg-brand-goldDark transition-colors duration-300 text-white"
            >
              Explore collection
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
      {/* recomended products */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className='text-3xl text-center mb-12'>
            Our latest product
          </h2>
          <div>
            <Suspense
              fallback={
                <div>
                  {Array.from({length: 4}).map((_, i) => (
                    <div className="animate-pulse flex flex-wrap gap-4" key={`skeleton-${i}`}>
                      <div className=' bg-gray-200 rounded w-20 h-20 ' />
                      <div className=' bg-gray-200 rounded w-20 h-20 ' />
                      <div className=' bg-gray-200 rounded w-20 h-20 ' />
                    </div>
                  ))}
                </div>
              }
            >
              <Await resolve={data.recommendedProducts}>
                {(response: RecommendedProductsQuery | null) => (
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {
                      response?.products.nodes.map((product) => (
                        <ProductItem key={product.id} product={product} loading='lazy' hidePrice />
                      ))
                    }
                  </div>
                )}
              </Await>
            </Suspense>
          </div>
        </div>
      </section>
      {/* craftmanship section */}
      <section className='py-20 px-4'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center '>
            <div className=''>
              <Image alt='Craft' className='w-full' data={{
                url: '/image/shoes-craft.png'
              }}
              sizes='(max-with: 768px) 100vw, (max-width: 1200px) 50vw, 33vw '
              />
            </div>
            <div className='max-w-full'>
              <h2 className='text-3xl mb-6'>
                Crafted by Master
              </h2>
              <p className='text-gray-600 mb-8 leading-relaxed'> 

              </p>
              <Link to='/pages/our-craft' className='inline-flex items-center text-brand-navy font-medium hover:text-brand-gold transition-colors duration-300'>
              Discovered Our Proccess
              <ArrowRight className='ml-2 w-5 h-5' />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* test */}
      <section className='py-20 px-4 bg-brand-navy text-white'>
        <div className='container mx-auto max-w-4xl text-center'>
            <div className='flex justify-center'>
                {
                  Array.from({length: 5}).map((_, i) => (
                    <Star key={`start-${i}`} fill='#C3A343' color="#C3A343" className='w-8 h-8 mb-8' />
                  ))
                }
            </div>
            <blockquote className='text-2xl md:text-3xl italic mb-8 max-w-2xl mx-auto'>
              "The attention to detail is simply remarkable. Every stitch and seam tells a story of dedication and craftsmanship."
            </blockquote>
            <cite className='text-gray-300 not-italic'>
              - The Luxury Shoemakerr Report
            </cite>
        </div>
      </section>
    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <div className="recommended-products">
      <h2 className="text-brand-gold">Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...ProductItem
      }
    }
  }
` as const;
