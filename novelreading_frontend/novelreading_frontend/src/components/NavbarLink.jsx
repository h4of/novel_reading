import { Link, useResolvedPath, useMatch } from "react-router-dom";

const NavbarLink = ({ to, children }) => {
  const resolvedPath = useResolvedPath(to);
  const isActived = useMatch({ path: resolvedPath.pathname });
  return (
    <li className={isActived ? "active nav-item" : "nav-item"}>
      <Link to={to} className="nav-item-text">
        {children}
      </Link>
    </li>
  );
};

export default NavbarLink;
