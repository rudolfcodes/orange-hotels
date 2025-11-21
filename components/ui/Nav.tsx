import type { NavProps } from "../../types/nav";
import Link from "next/link";

const Nav = ({ menu }: NavProps) => {
  return (
    <nav className="flex items-center justify-center">
      <ul className="flex space-x-4">
        {menu.map((item, index) => (
          <li key={`item.link-${index}`}>
            <Link href={item.link}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
