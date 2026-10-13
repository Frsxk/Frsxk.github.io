export const profile = {
  name: "frxskie",
  domain: "frxskie.me",
  role: "CS student · Software Engineer soon™",
  tagline:
    "A passionate CS student that loves Frisk from Undertale. A Software Engineer soon™. My pronouns are she/them. EN/ID okay! I was born on August 10, 20xx. GMT+7 Time zone.",
  location: "GMT+7",
  availability: "she/them",
  avatarFallback: "fr",
  heroLines: ["frxskie.", "a Cutie.", "a Developer.", "a Student.", "a Dreamer.", "a Smol Cat."],
  stats: [
    { value: "she/them", label: "Pronouns" },
    { value: "EN / ID", label: "Languages" },
    { value: "Aug 10", label: "Birthday" },
  ],
  tech: ["React", "TypeScript", "Tailwind v4", "Material 3", "Motion"],
}

export const favorites = [
  {
    icon: "restaurant",
    title: "Favorite Foods",
    description: "A few of my favorite things to eat.",
    items: [
      { label: "Ice Cream", image: "https://images.unsplash.com/photo-1708782343454-5d66dda6e107?w=400&h=400&fit=crop" },
      { label: "Cheesecake", image: "https://images.unsplash.com/photo-1685896211191-649aaefdf10a?w=400&h=400&fit=crop" },
      { label: "Any Eggs", image: "https://images.unsplash.com/photo-1606501129419-38058bd81ddc?w=400&h=400&fit=crop" },
      { label: "Ramen", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop" },
    ],
    variant: "filled" as const,
  },
  {
    icon: "sports_esports",
    title: "Favorite Games",
    description: "Games I love spending time with.",
    items: [
      { label: "Undertale", image: "/assets/images/games/undertale.png" },
      { label: "Honkai: Star Rail", image: "/assets/images/games/honkai_star_rail.png" },
      { label: "Needy Streamer Overload", image: "/assets/images/games/needy_streamer_overload.png" },
      { label: "Genshin Impact", image: "/assets/images/games/genshin_impact.png" },
    ],
    variant: "elevated" as const,
  },
  {
    icon: "bolt",
    title: "Favorite Activities",
    description: "Things I do in my free time.",
    items: [
      { label: "Coding", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop" },
      { label: "Music", image: "https://plus.unsplash.com/premium_photo-1723759436759-2b696c177360?w=400&h=400&fit=crop" },
      { label: "Reading", image: "https://images.unsplash.com/photo-1664619319027-cb086f9a11e0?w=400&h=400&fit=crop" },
      { label: "Sleeping", image: "https://plus.unsplash.com/premium_photo-1670869816898-7a4149b3de0c?w=400&h=400&fit=crop" },
    ],
    variant: "outlined" as const,
  },
]

export const projects = [
  {
    title: "Smol Maiden",
    description: "A Discord application that has multipurposes. Smol Maiden is built using Discord.js v13.",
    tags: ["Discord.js v13", "Bot"],
    status: "Private",
    image: "https://i.ibb.co.com/5WBcfZHP/image-2025-08-12-171515683.png",
    href: null,
  },
  {
    title: "Knight of The Night",
    description: "A web-based game with the theme of Adventure RPG. The game is made with Phaser3 framework.",
    tags: ["Phaser3", "Game", "RPG"],
    status: "Open source",
    image: "https://i.ibb.co.com/DHkZwLXX/image-2025-08-12-171329030.png",
    href: "https://github.com/Frsxk/knight-of-the-night",
  },
  {
    title: "frxskie.me (This Website)",
    description: "My simple (and cute) portfolio website built using React, TypeScript, and Tailwind CSS v4 with Material 3 Expressive.",
    tags: ["React 19", "TypeScript", "Tailwind v4", "M3E"],
    status: "Open source",
    image: "https://i.ibb.co.com/GrxDdp8/image.png",
    href: "https://github.com/Frsxk/Frsxk.github.io",
  },
]

export const socials = [
  { label: "GitHub", icon: "code", href: "https://github.com/Frsxk", handle: "@Frsxk" },
  { label: "Discord", icon: "chat", href: "https://discord.gg/2SatpX28ZX", handle: "Join my Discord server" },
]

export const navLinks = [
  { label: "Favorites", href: "#favorites" },
  { label: "Projects", href: "#projects" },
  { label: "Connect", href: "#connect" },
]
