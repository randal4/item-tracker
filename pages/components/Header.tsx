import React from 'react';
import { Navbar, Button } from 'flowbite-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Props = {
  user: any;
  signIn: Function;
  signOut: Function;
};

const Header = (props: Props) => {
  const router = useRouter();

  return (
    <Navbar fluid={true} rounded={true} className="px-2 sm:px-4 py-3.5 rounded">
      <Navbar.Brand>
        <Link href="/">
          <div className="cursor-pointer">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold">
              Tracker
            </span>
          </div>
        </Link>
      </Navbar.Brand>
      <div className="flex md:order-2 items-center">
        {props.user ? (
          <>
            <span className="py-2 pr-4 pl-3 text-gray-700 rounded md:border-0 md:p-0">
              {props.user.email}
            </span>
            <Button
              className="inline ml-3 py-2 pr-4 pl-3 text-gray-700 rounded  md:border-0  md:p-0 "
              onClick={() => props.signOut()}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <Button
            className="inline ml-3 py-2 pr-4 pl-3 text-gray-700 rounded  md:border-0  md:p-0 "
            onClick={() => props.signIn()}
          >
            Sign In
          </Button>
        )}
      </div>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/history">
          <a>History</a>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
