export const SITE_NAME = "Codevault";
export const SITE_TAGLINE = "Premium Source Code Marketplace";
export const SITE_DESCRIPTION =
  "Download premium, production-ready source codes for web, mobile and desktop applications.";
export const SITE_URL = "https://codevault.dev";

export const CURRENCY = "₹";

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const DASHBOARD_LINKS = [
  { name: "Dashboard", href: "/dashboard", icon: "home" },
  { name: "Purchases", href: "/dashboard/purchases", icon: "cart" },
  { name: "Settings", href: "/dashboard/settings", icon: "settings" },
];

export const ADMIN_LINKS = [
  { name: "Overview", href: "/admin", icon: "chart" },
  { name: "Products", href: "/admin/products", icon: "box" },
  { name: "Users", href: "/admin/users", icon: "users" },
];

export const SOCIAL_LINKS = {
  youtube: "https://youtube.com/@codevault",
  github: "https://github.com/codevault",
  twitter: "https://twitter.com/codevault",
  instagram: "https://instagram.com/codevault",
  discord: "https://discord.gg/codevault",
};

export const STATS = [
  { label: "Source Codes", value: "200+" },
  { label: "Happy Customers", value: "10K+" },
  { label: "Downloads", value: "50K+" },
  { label: "5-Star Reviews", value: "1.2K+" },
];

export const PRICING_PLANS = [
  {
    name: "Starter",
    price: 0,
    description: "Perfect for exploring free source codes",
    features: [
      "Access to 5 free templates",
      "Basic documentation",
      "Community support",
      "Monthly newsletter",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: 999,
    description: "Best for individual developers",
    features: [
      "Access to all source codes",
      "Premium documentation",
      "Priority email support",
      "Free updates for 1 year",
      "Commercial license",
      "Private Discord access",
    ],
    cta: "Get Pro Access",
    popular: true,
  },
  {
    name: "Team",
    price: 2999,
    description: "Perfect for teams and agencies",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Custom modifications",
      "Dedicated support",
      "Extended commercial license",
      "Early access to new codes",
      "1-on-1 consultation",
    ],
    cta: "Get Team Access",
    popular: false,
  },
];
