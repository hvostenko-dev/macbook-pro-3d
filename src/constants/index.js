const navLinks = [
    { label: "Overview", href: "#hero" },
    { label: "3D Studio", href: "#product-viewer" },
    { label: "M4 Chip", href: "#showcase" },
    { label: "Performance", href: "#performance" },
    { label: "Intelligence", href: "#features" },
    { label: "Compare", href: "#compare" },
    { label: "Highlights", href: "#highlights" },
];

const noChangeParts = [
    "Object_84",
    "Object_37",
    "Object_34",
    "Object_12",
    "Object_80",
    "Object_35",
    "Object_36",
    "Object_13",
    "Object_125",
    "Object_76",
    "Object_33",
    "Object_42",
    "Object_58",
    "Object_52",
    "Object_21",
    "Object_10",
];

const performanceImages = [
    { id: "p1", src: "/performance1.webp", alt: "Pro workflow rendering on MacBook Pro" },
    { id: "p2", src: "/performance2.webp", alt: "High-frame-rate gaming on Liquid Retina XDR" },
    { id: "p3", src: "/performance3.webp", alt: "3D modeling and CAD performance" },
    { id: "p4", src: "/performance4.webp", alt: "Multi-stream 8K video editing" },
    { id: "p5", src: "/performance5.webp", alt: "MacBook Pro M4 centerpiece" },
    { id: "p6", src: "/performance6.webp", alt: "Audio production with hundreds of tracks" },
    { id: "p7", src: "/performance7.webp", alt: "Machine learning and code compilation" },
];

const performanceImgPositions = [
    {
        id: "p1",
        left: 5,
        bottom: 65,
    },
    {
        id: "p2",
        right: 10,
        bottom: 60,
    },
    {
        id: "p3",
        right: -5,
        bottom: 45,
    },
    {
        id: "p4",
        right: -10,
        bottom: 0,
    },
    {
        id: "p5",
        left: 20,
        bottom: 50,
    },
    {
        id: "p6",
        left: 2,
        bottom: 30,
    },
    {
        id: "p7",
        left: -5,
        bottom: 0,
    },
];

const features = [
    {
        id: 1,
        icon: "/feature-icon1.svg",
        highlight: "Email AI.",
        text: "Summarize and draft replies to emails instantly, so you stay on top of your inbox.",
        videoPath: "/videos/feature-1.mp4",
        styles: "left-5 xl:left-16 top-[16%] opacity-0 translate-y-5",
    },
    {
        id: 2,
        icon: "/feature-icon2.svg",
        highlight: "Image AI.",
        text: "Generate or edit images with ease. Just type what you imagine, and let AI bring it to life.",
        videoPath: "/videos/feature-2.mp4",
        styles: "right-5 xl:right-16 top-[28%] opacity-0 translate-y-5",
    },
    {
        id: 3,
        icon: "/feature-icon3.svg",
        highlight: "Summarize AI.",
        text: "Turn long articles, reports, or notes into clear, bite-sized summaries in seconds.",
        videoPath: "/videos/feature-3.mp4",
        styles: "left-5 xl:left-16 top-[48%] opacity-0 translate-y-5",
    },
    {
        id: 4,
        icon: "/feature-icon4.svg",
        highlight: "AirDrop.",
        text: "Wirelessly share photos, large files, and more between your iPhone, your Mac, & other devices.",
        videoPath: "/videos/feature-4.mp4",
        styles: "right-5 xl:right-16 top-[66%] opacity-0 translate-y-5",
    },
    {
        id: 5,
        icon: "/feature-icon5.svg",
        highlight: "Writing Tool.",
        text: "Write smarter and faster, whether it’s blogs, essays, or captions, AI helps polish your words.",
        videoPath: "/videos/feature-5.mp4",
        styles: "left-5 xl:left-16 top-[82%] opacity-0 translate-y-5",
    },
];

const featureSequence = [
    { videoPath: "/videos/feature-1.mp4", boxClass: ".box1", delay: 0.4 },
    { videoPath: "/videos/feature-2.mp4", boxClass: ".box2", delay: 0 },
    { videoPath: "/videos/feature-3.mp4", boxClass: ".box3", delay: 0 },
    { videoPath: "/videos/feature-4.mp4", boxClass: ".box4", delay: 0 },
    { videoPath: "/videos/feature-5.mp4", boxClass: ".box5", delay: 0 },
];

const chipSpecs = [
    {
        id: "m4",
        name: "M4",
        tagline: "Phenomenal single-threaded & multithreaded CPU performance.",
        badge: "14-inch model",
        accent: "from-sky-400 via-blue-500 to-indigo-500",
        glow: "rgba(56, 189, 248, 0.22)",
        cpu: "10-core",
        gpu: "10-core",
        memory: "Up to 32GB",
        bandwidth: "120GB/s",
        battery: "Up to 24 hrs",
        displays: "Up to 2 external displays",
        benchmarks: [
            { label: "Scene Rendering (Blender)", multiplier: "3.4x", percent: 72 },
            { label: "AI Video Upscaling", multiplier: "4.2x", percent: 78 },
            { label: "Xcode Compilation", multiplier: "2.1x", percent: 68 },
        ],
    },
    {
        id: "m4-pro",
        name: "M4 Pro",
        tagline: "Built for researchers, developers, and creative pros demanding more.",
        badge: "14\" & 16\" models",
        accent: "from-purple-400 via-fuchsia-500 to-pink-500",
        glow: "rgba(192, 132, 252, 0.25)",
        cpu: "Up to 14-core",
        gpu: "Up to 20-core",
        memory: "Up to 64GB",
        bandwidth: "273GB/s",
        battery: "Up to 24 hrs",
        displays: "Up to 2 high-res displays",
        benchmarks: [
            { label: "Scene Rendering (Blender)", multiplier: "5.2x", percent: 88 },
            { label: "AI Video Upscaling", multiplier: "6.0x", percent: 90 },
            { label: "Xcode Compilation", multiplier: "3.0x", percent: 85 },
        ],
    },
    {
        id: "m4-max",
        name: "M4 Max",
        tagline: "Our most advanced chip ever built for a pro laptop.",
        badge: "14\" & 16\" models",
        accent: "from-amber-400 via-orange-500 to-rose-500",
        glow: "rgba(251, 146, 60, 0.25)",
        cpu: "Up to 16-core",
        gpu: "Up to 40-core",
        memory: "Up to 128GB",
        bandwidth: "546GB/s",
        battery: "Up to 21 hrs",
        displays: "Up to 4 external displays",
        benchmarks: [
            { label: "Scene Rendering (Blender)", multiplier: "7.8x", percent: 100 },
            { label: "AI Video Upscaling", multiplier: "9.8x", percent: 100 },
            { label: "Xcode Compilation", multiplier: "4.3x", percent: 100 },
        ],
    },
];

const footerLinks = [
    { label: "Privacy Policy", link: "#hero" },
    { label: "Terms of Use", link: "#hero" },
    { label: "Sales Policy", link: "#compare" },
    { label: "Legal", link: "#highlights" },
    { label: "Site Map", link: "#product-viewer" },
];

export {
    chipSpecs,
    features,
    featureSequence,
    footerLinks,
    navLinks,
    noChangeParts,
    performanceImages,
    performanceImgPositions,
};
