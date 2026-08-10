export const business = {
  name: "SAMIRAQ GLOBAL",
  tagline: "QUALITY SPICES • GLOBAL TRUST",
  owner: "ASHIM KHAN",
  businessType: "Proprietorship",
  email: "samiraqglobal@gmail.com",
  phones: ["+91 98276 42435", "+91 74891 68059"],
  whatsapp: "919827642435",
  location: "Sagar, Madhya Pradesh, India",
  pin: "470000",
  registrations: {
    gst: "",
    udyam: "",
    iec: "",
  },
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  },
  assets: {
    logo: "/images/logo.png",
    hero: "/images/whole-spices-hero.png",
  },
} as const;

export const products = [
  {
    slug: "red-chilli-powder",
    name: "Red Chilli Powder",
    hindiName: "Mirch",
    image: "/images/red-chilli-powder.png",
    description: "A vibrant, aromatic chilli powder selected to bring dependable colour and balanced heat to every recipe.",
  },
  {
    slug: "turmeric-powder",
    name: "Turmeric Powder",
    hindiName: "Haldi",
    image: "/images/turmeric-powder.png",
    description: "Golden turmeric powder with warm character and authentic Indian flavour for kitchens and food businesses.",
  },
  {
    slug: "cumin",
    name: "Cumin",
    hindiName: "Jeera",
    image: "/images/cumin.png",
    description: "Fragrant whole cumin chosen for its distinctive aroma, versatile culinary use, and consistent quality.",
  },
  {
    slug: "clove",
    name: "Clove",
    hindiName: "Long",
    image: "/images/clove.png",
    description: "Aromatic whole cloves suited to savoury blends, baking, beverages, and premium spice requirements.",
  },
  {
    slug: "green-cardamom",
    name: "Green Cardamom",
    hindiName: "Elaichi",
    image: "/images/green-cardamom.png",
    description: "Green cardamom with a bright, sweet-spiced aroma for discerning culinary and beverage applications.",
  },
  {
    slug: "black-pepper",
    name: "Black Pepper",
    hindiName: "Kali Mirch",
    image: "/images/black-pepper.png",
    description: "Bold, aromatic black pepper for everyday seasoning, professional kitchens, and bulk B2B supply.",
  },
] as const;

export const quantityOptions = ["500 kg", "1 Ton", "5 Tons", "Container Load", "Custom Quantity"] as const;

export function whatsappUrl(message = "Hello SAMIRAQ GLOBAL, I would like to request a quotation.", number: string = business.whatsapp) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
