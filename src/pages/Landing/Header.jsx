import Logo from "../../components/Logo";
import { Link } from "react-router-dom";
import { useGetSessionQuery } from "../../redux/apis/auth";
import { cn, toSentenceCase } from "../../utils/helpers";
import { useEffect, useState } from "react";
import UserMenu from "../../components/UserMenu";

const Header = () => {
  const { data, isLoading } = useGetSessionQuery();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn("sticky top-0 z-40 backdrop-blur-md bg-white/70", {
        "border-b border-zinc-200 shadow-sm": isScrolled,
      })}
    >
      <div className="container flex items-center justify-between h-[4.5rem] px-4 mx-auto">
        <Logo />

        <div className="items-center hidden gap-2 lg:!flex">
          {["home", "locations", "product", "pricing", "testimonials"].map(
            (item) => (
              <button
                key={item}
                className="outline-none text-[15px] text-zinc-600 hover:bg-zinc-100 hover:text-black transition-colors px-3 py-1.5 rounded-md"
                onClick={() => {
                  const section = document.getElementById(item);
                  if (section) {
                    const sectionTop = section.getBoundingClientRect().top;
                    const offset =
                      4.5 *
                      parseFloat(
                        getComputedStyle(document.documentElement).fontSize
                      );
                    window.scrollTo({
                      top: window.scrollY + sectionTop - offset,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                {toSentenceCase(item)}
              </button>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          {!data && !isLoading && (
            <Link
              to="/login"
              className="gap-2 px-3 py-2 transition-colors rounded-md hover:bg-zinc-100"
            >
              Login
            </Link>
          )}

          {data ? (
            <UserMenu />
          ) : (
            <Link
              to="/signup"
              className="transition-colors px-3 py-2 gap-2 rounded-md bg-gradient-to-br from-brand via-brand-foreground to-brand-foreground text-white hover:!bg-primary"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
