import {Suspense} from 'react';
import {Await, Form, NavLink} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="bg-brand-navy text-white">
            {/* signup section */}
            <div className="border-b border-white/10 ">
              <div className="container mx-auto px-4 py-12">
                <div className="max-w-xl mx-auto text-center">
                  <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
                  <p className="text-sm text-gray-300 mb-6">
                    Subscribe to our newsletter for the latest updates and
                    offers.
                  </p>
                  <Form
                    className="flex gap-4"
                    method="post"
                    action="/newsletter"
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 border bg-white/20 placeholder:text-gray-400 text-white rounded-md"
                    />
                    <button
                      className="px-6 py-3 bg-brand-gold text-white rounded-md text-sm hover:bg-brand-goldDark transition-colors duration-300"
                      type="submit"
                    >
                      Subscribe
                    </button>
                  </Form>
                </div>
              </div>
            </div>
            {/* main cocntent */}
              <div className="container mx-auto px-4 py-12">
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
                  {/* brand */}
                    <div>

                    </div>
                  {/* contact */}
                    <div>
                      
                    </div>
                  {/* quick links */}
                    <div>
                      
                    </div>
                  {/* social */}
                    <div>
                      
                    </div>
                </div>
              </div>
            {/* copyright */}
            <div className="border-t border-white/10 ">
              <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <p className="text-sm text-gray-300">
                    &copy; {new Date().getFullYear()} Tutor. All rights reserved.
                  </p>
                  <p className="text-sm text-gray-300">
                    Powered by <span className="text-brand-gold">Tutor</span>
                  </p>
                </div>
              </div>
            </div>
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
}) {
  return (
    <nav className="footer-menu" role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}
