export const site = {
  name: "VXNUS",
  description: "Technology Creative Studio.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vxnus.xyz",
  github: {
    name: "vxnuslabs",
    handle: "vxnuslabs",
    url: "https://github.com/vxnuslabs",
  },
  founder: {
    name: "Kur Zagin",
    url: "https://krzgn.xyz",
  },
} as const;
