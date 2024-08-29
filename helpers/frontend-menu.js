const getFrontendMenu = (role = "USER_ROLE") => {
  const menu = [
    {
      title: "Dashboard",
      icon: "fas fa-tachometer-alt",
      submenu: [
        {
          title: "Products",
          icon: "fas fa-box",
          link: "products",
        },
        {
          title: "Categories",
          icon: "fas fa-list",
          link: "categories",
        },
        {
          title: "Users",
          icon: "fas fa-users",
          link: "users",
        },
        {
          title: "Orders",
          icon: "fas fa-shopping-cart",
          link: "orders",
        },
        {
          title: "Customers",
          icon: "fas fa-cogs",
          link: "customers",
        },
      ],
    },
    {
      title: "Settings",
      icon: "fas fa-cogs",
      submenu: [
        {
          title: "Profile",
          icon: "fas fa-user",
          link: "profile",
        },
      ],
    },
    {
      title: "Maintenances",
      icon: "fas fa-cogs",
      submenu: [
        // {
        //   title: "Users",
        //   icon: "fas fa-users",
        //   link: "maintenances/users",
        // },
        {
          title: "Stores",
          icon: "fas fa-store",
          link: "maintenances/stores",
        },
        // {
        //   title: "Employees",
        //   icon: "fas fa-users",
        //   link: "maintenances/employees",
        // },
      ],
    },
  ];

  if (role === "ADMIN_ROLE") {
    menu[2].submenu.unshift(
      {
        title: "Users",
        icon: "fas fa-user",
        link: "maintenances/users",
      },
      {
        title: "Employees",
        icon: "fas fa-users",
        link: "maintenances/employees",
      }
    );
  }
  return menu;
};

module.exports = {
  getFrontendMenu,
};
