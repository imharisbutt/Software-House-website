import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/Home/HomePage";
import { ServicesPage } from "./pages/Services/ServicesPage";
import { CaseStudiesListPage } from "./pages/CaseStudies/CaseStudiesListPage";
import { CaseStudyDetailPage } from "./pages/CaseStudies/CaseStudyDetailPage";
import { BlogListPage } from "./pages/Blog/BlogListPage";
import { BlogDetailPage } from "./pages/Blog/BlogDetailPage";
import { CareersListPage } from "./pages/Careers/CareersListPage";
import { CareerDetailPage } from "./pages/Careers/CareerDetailPage";
import { AboutPage } from "./pages/About/AboutPage";
import { ContactPage } from "./pages/Contact/ContactPage";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/case-studies" element={<CaseStudiesListPage />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/careers" element={<CareersListPage />} />
        <Route path="/careers/:slug" element={<CareerDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
