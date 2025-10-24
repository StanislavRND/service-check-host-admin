export type MenuItem = {
  title: string;
  path: string;
};

export const menuItems: MenuItem[] = [
  {
    title: "Панель состояния",
    path: "/dashboard",
  },
  {
    title: "Агенты",
    path: "/agent",
  },
];
