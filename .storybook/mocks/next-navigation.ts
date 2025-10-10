export const useRouter = () => ({
  push: () => {},
  replace: () => {},
  prefetch: async () => {},
  back: () => {},
});

export const usePathname = () => "/";
export const useSearchParams = () => new URLSearchParams();
