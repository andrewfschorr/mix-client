import Link from 'next/link';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCocktail } from '@fortawesome/free-solid-svg-icons';

import AppContext from 'utils/AppContext';

const LOGGEDOUT_LINKS = [
  {
    name: 'login',
  },
  {
    name: 'signup',
  },
];

const ACTIVE_STYLE = 'border rounded text-white border-white bg-gray-600';

export default function Navigation({ pathname }) {
  return (
    <nav className="flex bg-gray-200 p-4">
      <ul className="flex w-full container mx-auto">
        <span className="flex-grow">
          <a href="/" className="logo">
            <FontAwesomeIcon
              icon={faCocktail}
              width="18"
              height="16"
              style={{ display: 'inline-block' }}
            />
            <span className="ml-2">TopOfShelf</span>
          </a>
        </span>
        <AppContext.Consumer>
          {(ctx) => {
            if (ctx.email) {
              return <h3>Oh hay {ctx.email}</h3>;
            }
            return (
              <ul className="flex">
                {LOGGEDOUT_LINKS.map((linkObj, i) => (
                  <li className="ml-4" key={i}>
                    <Link href={`/${linkObj.url ? linkObj.url : linkObj.name}`}>
                      <a
                        className={`px-3 py-1 ${
                          pathname.slice(1) === linkObj.name ? ACTIVE_STYLE : ''
                        }`}
                      >
                        {linkObj.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            );
          }}
        </AppContext.Consumer>
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  pathname: PropTypes.string.isRequired,
};
