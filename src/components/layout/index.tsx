import { FC, ReactNode, useEffect } from "react";
import { twMerge } from "tailwind-merge";

type SettingsLayoutProps = {
  className?: string;
  header?: ReactNode;
  children?: ReactNode;
};

const SettingsLayout: FC<SettingsLayoutProps> = (props) => {
  const { children } = props;
  // const { limitedAccess } = useStoreSelector((state) => state.bmapp);
  // const currentRoute = useCurrentRoute();
  //   const isWidgetAppearance = currentRoute === "appearance";

  useEffect(() => {
    // if (!isWidgetAppearance) return;

    const siderToggleButton = document.getElementById(
      "main-sider-collapse-toggle"
    );
    if (siderToggleButton?.clientWidth && siderToggleButton.clientWidth > 48) {
      siderToggleButton?.click();
    }
    return () => {
      if (
        siderToggleButton?.clientWidth &&
        siderToggleButton.clientWidth < 100
      ) {
        siderToggleButton?.click();
      }
    };
  }, []);

  return (
    <div
      className={twMerge(
        [
          "grid grid-cols-1 transition-all duration-300 md:h-full",
          //   header && "grid-rows-[auto_auto_1fr]",
          //   !header && "grid-rows-[auto_1fr]",
        ]
        // className
      )}
    >
      {/* {!limitedAccess && <BreadCrumbs />} */}

      {/* {header && (
				<div className={twMerge(['px-2 md:px-3'], !isWidgetAppearance && 'container')}>
					{header}
				</div>
			)} */}

      <div className={twMerge(["overflow-auto p-2 md:p-3"], "container")}>
        {children}
      </div>
    </div>
  );
};

export default SettingsLayout;
