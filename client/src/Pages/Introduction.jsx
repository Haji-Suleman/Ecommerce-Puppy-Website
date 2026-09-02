import React, { useState, useRef, useCallback, useEffect } from 'react';
import ChevronRight from "../assets/Next Gift.svg"
import ChevronLeft from "../assets/Previous Gift.svg"
import Check from "../assets/Checkmark.svg"
import CheckCircle2 from "../assets/Checkmark-1.svg"
import Lock from "../assets/Warning.svg"
import ShieldCheck from "../assets/Warning.svg"
import WashingMachine from "../assets/Warning.svg"
import Leaf from "../assets/Warning.svg"
import Sparkles from "../assets/Warning.svg"
import X from "../assets/Warning.svg"
import Plus from "../assets/Warning.svg"
import Minus from "../assets/Warning.svg"
import ShoppingCart from "../assets/Warning.svg"
import PawPrint from "../assets/Warning.svg"
import './Introduction.css';

/**
 * NOTE ON ICONS
 * Your bundler resolves `import X from "../assets/whatever.svg"` to a URL
 * string (the asset path / data URL), not a React component. That's why
 * `<PawPrint />` crashed — React tried to create an HTML tag literally named
 * after that string. Every icon below is rendered as `<img src={Icon} .../>`
 * instead, which works with plain asset imports.
 *
 * If you'd rather use them as components (so you can recolor them with
 * currentColor, animate them, etc.), switch to SVGR: rename the imports to
 * `import { ReactComponent as PawPrint } from "../assets/Warning.svg"` with
 * CRA, or use `vite-plugin-svgr` and import from "../assets/Warning.svg?react"
 * with Vite. Then you can go back to `<PawPrint />`.
 */

const GALLERY_IMAGES = [
    { id: 'g1', src: null, alt: 'PuppyPad laid out on the floor', label: 'Photo 1 — pad in use' },
    { id: 'g2', src: null, alt: 'PuppyPad next to a water bowl', label: 'Photo 2 — leak-proof demo' },
    { id: 'g3', src: null, alt: 'Dog standing on PuppyPad indoors', label: 'Photo 3 — lifestyle shot' },
    { id: 'g4', src: null, alt: 'Puppy resting on the patterned pad', label: 'Photo 4 — pattern detail' },
    { id: 'g5', src: null, alt: 'Five-star customer review graphic', label: 'Photo 5 — customer review' },
    { id: 'g6', src: null, alt: 'Dog lying on the pad on a bed', label: 'Photo 6 — hero shot' },
];

const SIZES = [
    { id: 'small', name: 'Small', dims: '16 x 24 in', metric: '(40 x 60 cm)', fitsFor: 'Puppies & small breeds under 20 lb' },
    { id: 'medium', name: 'Medium', dims: '28 x 32 in', metric: '(70 x 80 cm)', fitsFor: 'Medium breeds, 20–50 lb' },
    { id: 'large', name: 'Large', dims: '32 x 35 in', metric: '(80 x 90 cm)', fitsFor: 'Large breeds & multi-dog homes' },
];

const COLORS = [
    { id: 'gray', name: 'Gray', pattern: 'pattern-bones' },
    { id: 'white', name: 'White', pattern: 'pattern-paws' },
];

const CHECKLIST = [
    'No Training Required',
    'Leak & Odor Proof',
    'Easy To Clean & Reuse',
    'Saves You Money & The Planet',
];

const FEATURE_CARDS = [
    {
        icon: Lock,
        tone: 'tone-clay',
        title: '100% Leak-Proof',
        desc: 'Leak-proof with an anti-slip bottom to protect your furry friend.',
    },
    {
        icon: ShieldCheck,
        tone: 'tone-navy',
        title: 'Rip-Proof',
        desc: 'Your dog will never be able to rip these — guaranteed.',
    },
    {
        icon: WashingMachine,
        tone: 'tone-mint',
        title: 'Machine Washable',
        desc: 'Extra durable materials making it easy to launder.',
    },
    {
        icon: Leaf,
        tone: 'tone-sun',
        title: 'Eco-Friendly',
        desc: 'You and your pet doing your part together for the environment.',
    },
];

const FAQ_PILLS = [
    {
        id: 'how-it-works',
        label: 'How does it work?',
        answer:
            'PuppyPad uses a five-layer absorbent core with a leak-proof backing. Liquid soaks through the top layer and locks into the core, so the surface stays dry and odor stays trapped.',
    },
    {
        id: 'will-my-dog-use-it',
        label: 'Will my dog use it?',
        answer:
            'Most dogs take to PuppyPad within a few days, especially if it replaces disposable pads in the same spot. The textured surface mimics grass to encourage natural squatting.',
    },
    {
        id: 'how-long',
        label: 'How long does it last?',
        answer:
            'With regular washing, a single pad is built to last 12+ months of daily use before the absorbency starts to fade.',
    },
    {
        id: 'sizes',
        label: 'Which size is right?',
        answer:
            "Pick a pad roughly one and a half times your dog's resting length. Use the size guide link above the size selector if you're not sure.",
    },
];

export default function Introduction() {
    // ---- gallery state -------------------------------------------------
    const [activeSlide, setActiveSlide] = useState(0);
    const touchStartX = useRef(null);

    const goToSlide = useCallback((index) => {
        const total = GALLERY_IMAGES.length;
        setActiveSlide(((index % total) + total) % total);
    }, []);

    const goPrev = useCallback(() => goToSlide(activeSlide - 1), [activeSlide, goToSlide]);
    const goNext = useCallback(() => goToSlide(activeSlide + 1), [activeSlide, goToSlide]);

    const onTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 40) {
            delta > 0 ? goPrev() : goNext();
        }
        touchStartX.current = null;
    };

    const onStageKeyDown = (e) => {
        if (e.key === 'ArrowLeft') goPrev();
        if (e.key === 'ArrowRight') goNext();
    };

    // ---- selection state -------------------------------------------------
    const [selectedSize, setSelectedSize] = useState('small');
    const [selectedColor, setSelectedColor] = useState('white');
    const [quantity, setQuantity] = useState(1);
    const [openFaq, setOpenFaq] = useState(null);
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [justAdded, setJustAdded] = useState(false);

    const activeSize = SIZES.find((s) => s.id === selectedSize);
    const activeColor = COLORS.find((c) => c.id === selectedColor);

    const toggleFaq = (id) => {
        setOpenFaq((current) => (current === id ? null : id));
    };

    const handleAddToCart = () => {
        setJustAdded(true);
    };

    useEffect(() => {
        setJustAdded(false);
    }, [selectedSize, selectedColor, quantity]);

    useEffect(() => {
        if (!showSizeGuide) return;
        const onKey = (e) => e.key === 'Escape' && setShowSizeGuide(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [showSizeGuide]);

    return (
        <div className="pp-root">
            <div className="pp-grid">
                {/* ---------------- gallery column ---------------- */}
                <div className="pp-gallery">
                    <div
                        className="pp-stage"
                        tabIndex={0}
                        role="group"
                        aria-label={`Product image ${activeSlide + 1} of ${GALLERY_IMAGES.length}`}
                        onKeyDown={onStageKeyDown}
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                    >
                        <div
                            className="pp-stage-track"
                            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                        >
                            {GALLERY_IMAGES.map((img) => (
                                <div className="pp-stage-slide" key={img.id}>
                                    {img.src ? (
                                        <img src={img.src} alt={img.alt} />
                                    ) : (
                                        <div className="pp-stage-placeholder">
                                            <img src={PawPrint} alt="" className="pp-icon-lg" />
                                            <span>{img.label}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            className="pp-nav-btn pp-nav-prev"
                            onClick={goPrev}
                            aria-label="Previous image"
                        >
                            <img src={ChevronLeft} alt="" className="pp-icon" />
                        </button>
                        <button
                            type="button"
                            className="pp-nav-btn pp-nav-next"
                            onClick={goNext}
                            aria-label="Next image"
                        >
                            <img src={ChevronRight} alt="" className="pp-icon" />
                        </button>

                        <div className="pp-dots">
                            {GALLERY_IMAGES.map((img, i) => (
                                <button
                                    key={img.id}
                                    type="button"
                                    className={`pp-dot${i === activeSlide ? ' is-active' : ''}`}
                                    aria-label={`Go to image ${i + 1}`}
                                    onClick={() => goToSlide(i)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="pp-thumbs">
                        {GALLERY_IMAGES.map((img, i) => (
                            <button
                                key={img.id}
                                type="button"
                                className={`pp-thumb${i === activeSlide ? ' is-active' : ''}`}
                                onClick={() => goToSlide(i)}
                                aria-label={`Show ${img.label}`}
                                aria-current={i === activeSlide}
                            >
                                {img.src ? (
                                    <img src={img.src} alt="" />
                                ) : (
                                    <div className="pp-thumb-placeholder">
                                        <img src={PawPrint} alt="" className="pp-icon" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="pp-feature-cards">
                        {FEATURE_CARDS.map(({ icon, tone, title, desc }) => (
                            <div className="pp-feature-card" key={title}>
                                <div className={`pp-feature-icon ${tone}`}>
                                    <img src={icon} alt="" className="pp-icon" />
                                </div>
                                <div>
                                    <h4>{title}</h4>
                                    <p>{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ---------------- info column ---------------- */}
                <div className="pp-info">
                    <div className="pp-pills" role="tablist" aria-label="Frequently asked questions">
                        {FAQ_PILLS.map((pill) => (
                            <button
                                key={pill.id}
                                type="button"
                                role="tab"
                                aria-selected={openFaq === pill.id}
                                className={`pp-pill${openFaq === pill.id ? ' is-open' : ''}`}
                                onClick={() => toggleFaq(pill.id)}
                            >
                                <img src={Sparkles} alt="" className="pp-icon" />
                                {pill.label}
                            </button>
                        ))}
                    </div>

                    {openFaq && (
                        <div className="pp-pill-answer" role="tabpanel">
                            {FAQ_PILLS.find((p) => p.id === openFaq)?.answer}
                        </div>
                    )}

                    <h1 className="pp-title">PuppyPad — The Last Pee Pad You'll Get</h1>

                    <div className="pp-checklist">
                        {CHECKLIST.map((item) => (
                            <div className="pp-check-item" key={item}>
                                <img src={CheckCircle2} alt="" className="pp-icon" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>

                    <hr className="pp-divider" />

                    {/* size selector */}
                    <div className="pp-section-label">
                        <h3>
                            1. Select Your Size: <span>{activeSize?.name}</span>
                        </h3>
                        <button
                            type="button"
                            className="pp-link-btn"
                            onClick={() => setShowSizeGuide(true)}
                        >
                            Unsure What Size To Get?
                        </button>
                    </div>

                    <div className="pp-size-grid">
                        {SIZES.map((size) => {
                            const isSelected = size.id === selectedSize;
                            return (
                                <button
                                    key={size.id}
                                    type="button"
                                    className={`pp-size-card${isSelected ? ' is-selected' : ''}`}
                                    onClick={() => setSelectedSize(size.id)}
                                    aria-pressed={isSelected}
                                >
                                    {isSelected && (
                                        <span className="pp-check-badge">
                                            <img src={Check} alt="" className="pp-icon-sm" />
                                        </span>
                                    )}
                                    <span className="pp-size-name">{size.name.toUpperCase()}</span>
                                    <span className="pp-size-dims">{size.dims}</span>
                                    <span className="pp-size-metric">{size.metric}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* color selector */}
                    <div className="pp-section-label">
                        <h3>
                            2. Select Your Color: <span>{activeColor?.name}</span>
                        </h3>
                    </div>

                    <div className="pp-color-row">
                        {COLORS.map((color) => {
                            const isSelected = color.id === selectedColor;
                            return (
                                <button
                                    key={color.id}
                                    type="button"
                                    className={`pp-color-option${isSelected ? ' is-selected' : ''}`}
                                    onClick={() => setSelectedColor(color.id)}
                                    aria-pressed={isSelected}
                                >
                                    <span className={`pp-swatch ${color.pattern}`}>
                                        {isSelected && (
                                            <span className="pp-swatch-check">
                                                <img src={Check} alt="" className="pp-icon-sm" />
                                            </span>
                                        )}
                                    </span>
                                    <span className="pp-color-name">{color.name.toUpperCase()}</span>
                                </button>
                            );
                        })}
                    </div>

                    <hr className="pp-divider" />

                    {/* quantity + add to cart */}
                    <p className="pp-selection-summary">
                        {activeSize?.name} · {activeSize?.dims} · {activeColor?.name}
                    </p>

                    <div className="pp-purchase-row">
                        <div className="pp-qty">
                            <button
                                type="button"
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                disabled={quantity <= 1}
                                aria-label="Decrease quantity"
                            >
                                <img src={Minus} alt="" className="pp-icon-sm" />
                            </button>
                            <span>{quantity}</span>
                            <button
                                type="button"
                                onClick={() => setQuantity((q) => Math.min(9, q + 1))}
                                disabled={quantity >= 9}
                                aria-label="Increase quantity"
                            >
                                <img src={Plus} alt="" className="pp-icon-sm" />
                            </button>
                        </div>

                        <button type="button" className="pp-add-btn" onClick={handleAddToCart}>
                            <img src={ShoppingCart} alt="" className="pp-icon" />
                            Add {quantity > 1 ? `${quantity} ` : ''}To Cart
                        </button>
                    </div>

                    {justAdded && (
                        <div className="pp-toast" role="status">
                            <img src={CheckCircle2} alt="" className="pp-icon" />
                            Added {quantity} × {activeSize?.name} / {activeColor?.name} PuppyPad to your cart.
                        </div>
                    )}
                </div>
            </div>

            {/* ---------------- size guide modal ---------------- */}
            {showSizeGuide && (
                <div
                    className="pp-modal-overlay"
                    onClick={(e) => e.target === e.currentTarget && setShowSizeGuide(false)}
                >
                    <div className="pp-modal" role="dialog" aria-modal="true" aria-labelledby="pp-guide-title">
                        <button
                            type="button"
                            className="pp-modal-close"
                            onClick={() => setShowSizeGuide(false)}
                            aria-label="Close size guide"
                        >
                            <img src={X} alt="" className="pp-icon" />
                        </button>
                        <h3 id="pp-guide-title">Find your size</h3>
                        <p>Measure your dog nose-to-tail, then match it to the guide below.</p>
                        <table className="pp-guide-table">
                            <thead>
                                <tr>
                                    <th>Size</th>
                                    <th>Dimensions</th>
                                    <th>Best for</th>
                                </tr>
                            </thead>
                            <tbody>
                                {SIZES.map((size) => (
                                    <tr
                                        key={size.id}
                                        className={size.id === selectedSize ? 'pp-guide-row-highlight' : ''}
                                    >
                                        <td>{size.name}</td>
                                        <td>{size.dims}</td>
                                        <td>{size.fitsFor}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}