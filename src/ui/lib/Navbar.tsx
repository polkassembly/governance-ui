import { useState, createContext, useContext, forwardRef } from 'react';
import type { BaseElementProps, ClickableProps } from './types.js';

interface INavbarContext {
  collapsed: boolean;
  toggle: () => void;
}

const navbarContext = createContext<INavbarContext>({
  collapsed: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggle: () => {},
});
const useNavbar = () => useContext(navbarContext);
const NavbarContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => {
    setCollapsed((collapsed) => !collapsed);
  };
  return (
    <navbarContext.Provider value={{ collapsed, toggle }}>
      {children}
    </navbarContext.Provider>
  );
};

const Brand = ({ children, className }: BaseElementProps) => {
  return (
    <div className={`flex items-center ${className || ''}`}> {children}</div>
  );
};

const Item = ({ children, className, onClick }: ClickableProps) => {
  return (
    <li
      onClick={onClick}
      className={`block rounded py-2 pl-3 pr-4 text-gray-700 md:p-0  ${
        className || ''
      }`}
    >
      {children}
    </li>
  );
};

const Content = ({ children, className }: BaseElementProps) => {
  const { collapsed } = useNavbar();
  return (
    <div
      className={`${
        collapsed ? 'hidden' : 'flex'
      } absolute left-0 top-full z-20 order-last h-full min-h-screen w-full basis-full flex-col items-center justify-between overflow-y-auto overflow-x-hidden bg-white  md:static md:order-none md:flex md:h-auto md:min-h-min md:w-auto md:basis-auto md:flex-row md:bg-inherit`}
      id="navbar-content"
    >
      <ul
        className={`mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:border-0  md:text-sm md:font-medium ${className}`}
      >
        {children}
      </ul>
    </div>
  );
};

const Component = forwardRef<HTMLElement, BaseElementProps>(
  ({ className, children }, ref) => {
    return (
      <nav
        className={`fixed z-10 w-full bg-bg-default px-2  md:px-4 ${
          className || ''
        }`}
        ref={ref}
      >
        <div className="mx-auto flex w-full flex-wrap items-center justify-between md:py-6">
          <NavbarContextProvider>{children}</NavbarContextProvider>
        </div>
        <div className="h-[1px] w-full bg-[#E9E9E9]" />
      </nav>
    );
  }
);
const Navbar = Object.assign(Component, { Item, Brand, Content });

export { Navbar };
