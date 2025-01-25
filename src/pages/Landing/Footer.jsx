import Logo from "../../components/Logo";

const Footer = () => {
  return (
    <footer className="container flex items-center justify-between w-full py-12 mx-auto mt-20 bg-white border-t border-gray-200">
      <Logo />
      <span className="text-sm text-gray-500">
        © {new Date().getFullYear()} Bravt Cloud. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
