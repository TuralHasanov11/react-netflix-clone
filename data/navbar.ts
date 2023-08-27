interface NavbarItem {
  label: string;
  active?: boolean;
}

export const navbarItems: NavbarItem[] = [
  { label: "Home", active: true },
  { label: "Series" },
  { label: "Films" },
  { label: "New & Popular" },
  { label: "My List" },
  { label: "Browse by Languages" },
];
