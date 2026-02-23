import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapIcon,
  Phone,
} from 'lucide-react';
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* brand */}
                <div className="space-y-6">
                  <h3 className="text-2xl uppercase">Nenzy</h3>
                  <p className="leading-relaxed text-sm text-gray-300">
                    Your trusted learning partner for all your educational
                    needs.
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/30 hover:text-brand-gold transition-colors duration-300"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://facebook.com"
                      className="text-white/30 hover:text-brand-gold transition-colors duration-300"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      className="text-white/30 hover:text-brand-gold transition-colors duration-300"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                {/* contact */}
                <div className="space-y-6">
                  <h4 className="text-lg uppercase">Contact Us</h4>
                  <ul className="space-y-4 text-sm text-gray-400">
                    <li className="flex items-start space-x-3">
                      <MapIcon className="w-5 h-5 mt-1 text-brand-gold flex-shrink-0" />
                      <span>123 Education Street, Learning City</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 mt-1 text-brand-gold flex-shrink-0" />
                      <span>+1 (555) 123-4567</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 mt-1 text-brand-gold flex-shrink-0" />
                      <span>contact@tutor.com</span>
                    </li>
                  </ul>
                </div>
                {/* quick links */}
                <div className="space-y-6">
                  <h4 className="text-lg uppercase">Quick Links</h4>
                  <ul className="space-y-4 text-sm">
                    <li>
                      <NavLink
                        to="/colections/all"
                        className="text-gray-300 hover:text-brand-gold transition-colors duration-300"
                      >
                        Products
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/pages/our-craft"
                        className="text-gray-300 hover:text-brand-gold transition-colors duration-300"
                      >
                        Our Craft
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/pages/care-guide"
                        className="text-gray-300 hover:text-brand-gold transition-colors duration-300"
                      >
                        Care Guide
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/pages/about-us"
                        className="text-gray-300 hover:text-brand-gold transition-colors duration-300"
                      >
                        About Us
                      </NavLink>
                    </li>
                  </ul>
                </div>
                {/* policies */}
                <div className="space-y-6">
                  <h4 className="text-lg uppercase">Policies</h4>
                  <FooterMenu
                    menu={footer?.menu}
                    primaryDomainUrl={header.shop.primaryDomain.url}
                    publicStoreDomain={publicStoreDomain}
                  />
                </div>
              </div>
            </div>
            {/* copyright */}
            <div className="border-t border-white/10 ">
              <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <p className="text-sm text-gray-300">
                    &copy; {new Date().getFullYear()} Tutor. All rights
                    reserved.
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
    <nav className="space-y-3 text-sm " role="navigation">
      {menu?.items.map((item) => {
        if (!item.url) {
          return null;
        }
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className={({isActive}) =>
              `block text-gray-300 hover:text-brand-gold transition-colors duration-300 ${isActive ? 'text-brand-gold' : ''}`
            }
            end
            key={item.id}
            to={url}
            prefetch="intent"
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}
