import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const useActiveItems = () => {
  const { pathname } = useLocation();

  const trimmedPathname = pathname.split("/")[1];

  const activeKeys = useMemo(() => {
    const childRoute = trimmedPathname;

    if (childRoute) return [childRoute];
    return [];
  }, [trimmedPathname]);

  return { activeKeys };
};
