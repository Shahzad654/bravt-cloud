import { Link } from "react-router-dom";
import { cn } from "../../utils/helpers";
import Header from "../Landing/Header";

export function LegalLayout({ children, className }) {
  return (
    <div className="tailwind-layout">
      <Header />
      <main className="container mx-auto">
        <div
          className={cn("prose prose-gray mx-auto max-w-4xl mt-12", className)}
        >
          {children}
        </div>
        <div className="py-12 text-sm text-center text-gray-500">
          <Link to="/" className="hover:text-primary">
            Return to Homepage
          </Link>
        </div>
      </main>
    </div>
  );
}
