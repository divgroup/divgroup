import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import profileDataJson from "./data/profile.json";
import { ProfileData } from "./types";

// Import layout components
import Header from "./components/Header";
import Cover from "./components/Cover";
import Mission from "./components/Mission";
import About from "./components/About";
import IntroVideo from "./components/IntroVideo";
import Projects from "./components/Projects";
import Gallery from "./components/Gallery";
import Services from "./components/Services";
import Community from "./components/Community";
import GoogleMap from "./components/GoogleMap";
import Contact from "./components/Contact";
import ThankYou from "./components/ThankYou";
import Footer from "./components/Footer";

export default function App() {
  const [data, setData] = useState<ProfileData>(() => {
    const saved = localStorage.getItem("hachi_profile_data_v1");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && parsed.coverImage) {
          return parsed;
        }
      } catch (e) {
        console.error("Error loading saved profile data:", e);
      }
    }
    return profileDataJson as ProfileData;
  });

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    // Dynamically set SEO metadata on page mount
    document.title = `${data.fullName} | ${data.title} - Digital Business Profile`;

    // Inject/Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", data.bioShort);

    // Inject/Update Open Graph OG Tags for SEO indexing
    const ogTags = [
      { property: "og:title", content: `${data.fullName} - Business ID` },
      { property: "og:description", content: data.bioShort },
      { property: "og:image", content: data.avatar },
      { property: "og:type", content: "profile" },
    ];

    ogTags.forEach((tag) => {
      let element = document.querySelector(`meta[property="${tag.property}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", tag.content);
    });

    // Ingress Scroll Listeners for Scroll Progress & Back-to-Top trigger
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data]);

  const saveProfileDataSafely = (updated: ProfileData) => {
    try {
      localStorage.setItem("hachi_profile_data_v1", JSON.stringify(updated));
    } catch (e) {
      console.warn(
        "Local Storage Quota exceeded! The changes are temporarily active in-memory but won't persist after refresh.",
        e
      );
    }
  };

  const handleUpdateCover = (newCoverUrl: string) => {
    setData((prev) => {
      const updated = { ...prev, coverImage: newCoverUrl };
      saveProfileDataSafely(updated);
      return updated;
    });
  };

  const handleUpdateAvatar = (newAvatarUrl: string) => {
    setData((prev) => {
      const updated = { ...prev, avatar: newAvatarUrl };
      saveProfileDataSafely(updated);
      return updated;
    });
  };

  const handleUpdateProfileInfo = (fullName: string, title: string, bioShort: string) => {
    setData((prev) => {
      const updated = { ...prev, fullName, title, bioShort };
      saveProfileDataSafely(updated);
      return updated;
    });
  };

  const handleUpdateAboutImage = (newImageUrl: string) => {
    setData((prev) => {
      const updated = {
        ...prev,
        about: {
          ...prev.about,
          profileImageUrl: newImageUrl,
        },
      };
      saveProfileDataSafely(updated);
      return updated;
    });
  };

  const handleUpdateVideo = (youtubeId: string, poster?: string) => {
    setData((prev) => {
      const updated = {
        ...prev,
        video: {
          ...prev.video,
          youtubeId,
          ...(poster ? { poster } : {}),
        },
      };
      saveProfileDataSafely(updated);
      return updated;
    });
  };

  const handleUpdateProjectImage = (id: string, newImageUrl: string) => {
    setData((prev) => {
      const updatedProjects = prev.projects.map((p) =>
        p.id === id ? { ...p, image: newImageUrl } : p
      );
      const updated = { ...prev, projects: updatedProjects };
      saveProfileDataSafely(updated);
      return updated;
    });
  };

  const handleUpdateGalleryImage = (id: string, newImageUrl: string) => {
    setData((prev) => {
      const updatedGallery = prev.gallery.map((g) =>
        g.id === id ? { ...g, image: newImageUrl } : g
      );
      const updated = { ...prev, gallery: updatedGallery };
      saveProfileDataSafely(updated);
      return updated;
    });
  };

  const handleUpdateContactInfo = (phone: string, email: string, address: string) => {
    setData((prev) => {
      const updated = { ...prev, phone, email, address };
      saveProfileDataSafely(updated);
      return updated;
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // If thank you is triggered, render the dedicated thank you component with return mechanism
  if (showThankYou) {
    return <ThankYou onBack={() => setShowThankYou(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-gray-900 selection:text-white">
      {/* Scroll Progress Bar (Top edge) */}
      <div
        className="fixed top-0 left-0 h-1 bg-gray-900 z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Header */}
      <Header data={data} />

      {/* Core Landing Page Flow */}
      <main className="flex-grow">
        {/* Section 1: Cover */}
        <Cover
          data={data}
          onUpdateCover={handleUpdateCover}
          onUpdateAvatar={handleUpdateAvatar}
          onUpdateProfileInfo={handleUpdateProfileInfo}
        />

        {/* Section 2: Mission, Vision, strategy */}
        <Mission data={data} />

        {/* Section 3: About biography */}
        <About data={data} onUpdateAboutImage={handleUpdateAboutImage} />

        {/* Section 4: Intro Video */}
        <IntroVideo data={data} onUpdateVideo={handleUpdateVideo} />

        {/* Section 5: Featured Projects */}
        <Projects data={data} onUpdateProjectImage={handleUpdateProjectImage} />

        {/* Section 6: Image Gallery Carousel */}
        <Gallery data={data} onUpdateGalleryImage={handleUpdateGalleryImage} />

        {/* Section 7: Services offered */}
        <Services data={data} />

        {/* Section 8: Social communities */}
        <Community data={data} />

        {/* Section 9: Embedded HQ Map */}
        <GoogleMap data={data} />

        {/* Section 10: Contact coordinates & message board */}
        <Contact
          data={data}
          onSubmitSuccess={() => setShowThankYou(true)}
          onUpdateContactInfo={handleUpdateContactInfo}
        />
      </main>

      {/* Footer copyright */}
      <Footer data={data} />

      {/* Floating Back-To-Top button */}
      <button
        id="floating-back-to-top"
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-white text-gray-900 border border-gray-100 shadow-2xl transition-all duration-300 z-40 hover:bg-gray-950 hover:text-white hover:scale-105 active:scale-95 ${
          showScrollTop ? "translate-y-0 opacity-100 scale-100 pointer-events-auto" : "translate-y-12 opacity-0 scale-75 pointer-events-none"
        }`}
        aria-label="Scroll back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}
