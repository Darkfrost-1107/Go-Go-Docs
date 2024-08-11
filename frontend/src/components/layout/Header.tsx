import Link from 'next/link';
import AuthBox from '../auth/AuthBox';

export default function Header() {
  return (
    <header>
      <div>
        <h1>
          GoGoDocs
        </h1>
        <nav>
          <Link href="/">
            Home
          </Link>
          <AuthBox />
        </nav>
      </div>
    </header>
  );
}
