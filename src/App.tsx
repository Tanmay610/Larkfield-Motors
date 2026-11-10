import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { StylePackProvider } from "@/style-packs/larkfield";
import NotFound from "@/pages/NotFound";
import Auth from "@/pages/Auth";
import Admin from "@/pages/Admin";

const SitePage = lazy(() => import("@/pages/site/index"));

export default function App() {
  return (
    <StylePackProvider>
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<SitePage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/sign-in" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/messages" element={<Admin />} />
          <Route path="/demo" element={<Admin />} />
          <Route path="/demo/messages" element={<Admin />} />
          <Route path="/:page" element={<SitePage />} />
          <Route path="/:page/:item" element={<SitePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </StylePackProvider>
  );
}
