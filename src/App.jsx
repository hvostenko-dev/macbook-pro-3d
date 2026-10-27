import NavBar from "./components/NavBar.jsx";
import Hero from "./components/Hero.jsx";
import ProductViewer from "./components/ProductViewer.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Performance from "./components/Performance.jsx";
import Features from "./components/Features.jsx";
import ChipComparison from "./components/ChipComparison.jsx";
import Highlights from "./components/Highlights.jsx";
import Footer from "./components/Footer.jsx";
import Showcase from "./components/Showcase.jsx";
import BuyModal from "./components/BuyModal.jsx";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
    return (
        <main className="relative overflow-x-clip">
            <NavBar />
            <Hero />
            <ProductViewer />
            <Showcase />
            <Performance />
            <Features />
            <ChipComparison />
            <Highlights />
            <Footer />
            <BuyModal />
        </main>
    );
};

export default App;
