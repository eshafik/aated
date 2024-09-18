import { ThemeConfig } from "antd";

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: "#056608",
    borderRadius: 5,
  },
  components: {
    Input: {
      controlHeight: 38,
    },
    Button: {
      controlHeight: 38,
      colorBorder: "transparent",
      defaultShadow: "3px 3px 3px 3px rgba(0.02, 0.02, 0.02, 0.05)",
      defaultHoverBorderColor: "transparent",
      defaultHoverBg: "#E0FFFF",
      // colorPrimaryHover:"#90EE90"
      textHoverBg: "#E0FFFF",
    },
    Select: {
      controlHeight: 38,
    },
    Menu: {
      itemSelectedBg: "#056608",
      colorPrimary: "white",
      itemHoverBg: "#E0FFFF",
    },
  },
};
