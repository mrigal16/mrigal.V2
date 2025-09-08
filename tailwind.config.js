/** @type {import('tailwindcss').Config} */

const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#1a1a66",
        card: "#ffffff",
        "card-foreground": "#1a1a66",
        popover: "#ffffff",
        "popover-foreground": "#1a1a66",
        primary: "#29297d",
        "primary-foreground": "#fefefe",
        secondary: "#f8f8ff",
        "secondary-foreground": "#29297d",
        muted: "#f8f8ff",
        "muted-foreground": "#7474aa",
        accent: "#f8f8ff",
        "accent-foreground": "#29297d",
        destructive: "#cc4343",
        border: "#ececff",
        input: "#ececff",
        ring: "#a0a0d9",
        "chart-1": "#cc9943",
        "chart-2": "#76a7c9",
        "chart-3": "#5a7ab2",
        "chart-4": "#e9c372",
        "chart-5": "#dfb654",
        // dark theme overrides (optional)
        dark: {
          background: "#1a1a66",
          foreground: "#fefefe",
          card: "#29297d",
          "card-foreground": "#fefefe",
          popover: "#29297d",
          "popover-foreground": "#fefefe",
          primary: "#ececff",
          "primary-foreground": "#29297d",
          secondary: "#44447a",
          "secondary-foreground": "#fefefe",
          muted: "#44447a",
          "muted-foreground": "#a0a0d9",
          accent: "#44447a",
          "accent-foreground": "#fefefe",
          destructive: "#ce5b40",
          border: "rgba(255, 255, 255, 0.1)",
          input: "rgba(255, 255, 255, 0.15)",
          ring: "#8888c7",
        },
      },
      borderRadius: {
        DEFAULT: "0.625rem", // = 10px
      },
    },
  },
  plugins: [],
  experimental: {
    optimizeUniversalDefaults: true,
  },
};

export default config;
