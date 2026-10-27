import { footerLinks } from "../constants/index.js";

const Footer = () => {
    return (
        <footer className="border-t border-white/10 mt-10">
            <div className="info">
                <p>
                    More ways to shop:{" "}
                    <a href="#product-viewer" className="text-primary hover:underline">
                        Find an Apple Store
                    </a>{" "}
                    or other retailer near you. Or call 1-800-MY-APPLE.
                </p>
                <a href="#hero" aria-label="Back to top">
                    <img src="/logo.svg" alt="Apple logo" className="w-4 h-4 opacity-80 hover:opacity-100 transition" />
                </a>
            </div>

            <hr />

            <div className="links">
                <p>Copyright © {new Date().getFullYear()} Apple Inc. All rights reserved.</p>

                <ul>
                    {footerLinks.map(({ label, link }) => (
                        <li key={label}>
                            <a href={link}>{label}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
