/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/dashboard/InstanceDetails/*.{js,ts,jsx,tsx}",
    "./src/dashboard/FirewallDetails/*.{js,ts,jsx,tsx}",
    "./src/dashboard/CreateSnapshot/*.{js,ts,jsx,tsx}",
    "./src/pages/Landing/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary-color)",
        },
        brand: {
          DEFAULT: "hsl(var(--brand))",
          foreground: "hsl(var(--brand-foreground))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
