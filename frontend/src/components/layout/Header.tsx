import AuthBox from '../auth/AuthBox';
import { ButtonLink } from '../ui/buttonLink';

export default function Header() {
  return (
    <header className="flex items-center w-full justify-center">
      <div className="flex items-center justify-between px-6 py-4 w-full max-w-7xl">
        <h1>
          GoGoDocs
        </h1>
        <nav className="flex gap-4 items-center">
          <ButtonLink href="/" variant="ghost" className="">
            Home
          </ButtonLink>
          <AuthBox />
        </nav>
      </div>
    </header>
  );
}
