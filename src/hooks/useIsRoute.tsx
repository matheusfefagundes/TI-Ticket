import { usePathname } from "next/navigation";

interface useIsRouteProps {
  ref: string;
}

export function useIsRoute({ ref }: useIsRouteProps) {
  const pathname = usePathname();

  const rotesToHide = [`${ref}`];

  const isUser = rotesToHide.includes(pathname);

  return isUser;
}
