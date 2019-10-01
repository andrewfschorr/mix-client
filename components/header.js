import PropTypes from 'prop-types';
import 'styles/global.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCocktail } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const LOGGEDOUT_LINKS = [{
  name: 'login',
}, {
  name: 'signup',
}];

const ACTIVE_STYLE = 'border rounded text-white border-white bg-gray-600';

export default function Header({ type, pathname }) {
  let links;
  if (type === 'loggedout') {
    links = LOGGEDOUT_LINKS;
  }

  return (
    <nav className="flex bg-gray-200 p-4">
      <ul className="flex w-full">
        <span className="flex-grow">
          <a href="/" className="logo">
            <FontAwesomeIcon icon={faCocktail} width="18" height="16" style={{ display: 'inline-block' }} />
            <span className="ml-2">MixApp</span>
          </a>
        </span>
        <ul className="flex">
          {links.map((linkObj, i) => (
            <li className="ml-4" key={i}>
              <Link
                href={`/${linkObj.url ? linkObj.url : linkObj.name}`}>
                <a
                  className={`px-3 py-1 ${pathname.slice(1) === linkObj.name ? ACTIVE_STYLE : ''}`}
                >{linkObj.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </ul>
    </nav>
  );
}

Header.propTypes = {
  type: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};
