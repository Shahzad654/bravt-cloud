import Logo from "../../components/Logo";
import { Link } from "react-router-dom";
import { useGetSessionQuery } from "../../redux/apis/auth";

const Header = () => {
  const { data } = useGetSessionQuery();

  return (
    <div className="flex items-center justify-between w-full px-4 py-3">
      <Logo />
      <div className="flex items-center gap-2">
        {!data && (
          <Link
            to="/login"
            className="gap-2 px-3 py-2 transition-colors rounded-md hover:bg-zinc-100"
          >
            Login
          </Link>
        )}

        <Link
          to={data ? "/instance" : "/signup"}
          className="transition-colors px-3 py-2 gap-2 rounded-md bg-gradient-to-br from-brand via-brand-foreground to-brand-foreground text-white hover:!bg-primary"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Header;
