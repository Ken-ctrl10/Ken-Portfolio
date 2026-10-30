import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./components/Main-Page";
import AboutPage from "./components/About-Page";
import ProjectPage from "./components/Project-Page";
import ContactPage from "./components/Contact-Page";

/**
 * Theme state is no longer held here. MUI's useColorScheme() owns it (see
 * Header), persisting to the same localStorage key the inline script in
 * index.html reads before first paint -- which is what removed the flash of
 * light theme on load.
 */
function App() {
  return (
    <div className="app-shell">
      <Header />

      <main>
        <MainPage />
        <AboutPage />
        <ProjectPage />
        <ContactPage />
      </main>

      <Footer />
    </div>
  );
}

export default App;
