import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { GallerySkeleton } from "./components/LoadingSkeleton";
import { Toaster } from "./components/ui/sonner";

const GalleryPage = lazy(() =>
  import("./pages/GalleryPage").then((m) => ({ default: m.GalleryPage })),
);
const CharacterDetailPage = lazy(() =>
  import("./pages/CharacterDetailPage").then((m) => ({
    default: m.CharacterDetailPage,
  })),
);
const CreatePage = lazy(() =>
  import("./pages/CreatePage").then((m) => ({ default: m.CreatePage })),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, refetchOnWindowFocus: false },
  },
});

const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Suspense
          fallback={
            <div className="p-8">
              <GallerySkeleton />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </Layout>
      <Toaster position="bottom-right" richColors />
    </QueryClientProvider>
  ),
});

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: GalleryPage,
});

const characterDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/character/$id",
  component: CharacterDetailPage,
});

const createRoute_ = createRoute({
  getParentRoute: () => rootRoute,
  path: "/create",
  component: CreatePage,
});

const routeTree = rootRoute.addChildren([
  galleryRoute,
  characterDetailRoute,
  createRoute_,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
