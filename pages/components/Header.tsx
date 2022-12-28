import React from 'react';
import { Navbar, Button } from 'flowbite-react';

type Props = {
  user: any;
  signIn: Function;
  signOut: Function;
};

const Header = (props: Props) => {
  return (
    <Navbar
      fluid={true}
      rounded={true}
      className="bg-gray-900 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900"
    >
      <Navbar.Brand href="https://flowbite.com/">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Tracker
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 items-center">
        {props.user ? (
          <>
            <span className="py-2 pr-4 pl-3 text-gray-700 rounded md:border-0 md:p-0 dark:text-gray-400 text-white ">
              {props.user.email}
            </span>
            <Button
              className="inline ml-3 py-2 pr-4 pl-3 text-gray-700 rounded  md:border-0  md:p-0 dark:text-gray-400"
              onClick={() => props.signOut()}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <Button
            className="inline ml-3 py-2 pr-4 pl-3 text-gray-700 rounded  md:border-0  md:p-0 dark:text-gray-400"
            onClick={() => props.signIn()}
          >
            Sign In
          </Button>
        )}
      </div>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href="">History</Navbar.Link>
        <Navbar.Link href="#"></Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
