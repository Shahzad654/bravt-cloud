/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/dashboard/InstanceDetails/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary-color)",
        },
      },
    },
  },
  plugins: [],
};
