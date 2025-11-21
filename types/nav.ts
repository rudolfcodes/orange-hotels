interface MenuItem {
  label: string;
  link: string;
}

interface NavProps {
  menu: MenuItem[];
}

export type { NavProps, MenuItem };
