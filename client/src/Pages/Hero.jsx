import Navbar from "../Components/Navbar";
import "./Hero.css";
import five_star_rating from "../assets/5 Star Rating.svg"
import Checkmark from "../assets/Checkmark.svg"
import Arrow from "../assets/arrow.svg"
import Video from "C://Users//Haji Suleman//Videos//Screen Recordings//Screen Recording 2026-05-19 094338.mp4"
const ICON = {
    star: "/icons/star.svg",
    check: "../assets/Checkmark.svg",
    arrow: "/icons/arrow.svg",
};

const CHECKLIST = [
    {
        bold: "Patented Infused Pheromones",
        rest: " That Attract Your Dogs To Pee On The PuppyPad",
    },
    {
        bold: "Replaces Over 1,000 Disposable Pads",
        rest: " - Just wash & reuse (saves $2,000/year)",
    },
    {
        bold: null,
        rest: "Absorbs In Less Than 5 Seconds With No Odor",
    },
];

export default function Hero({
    reviewCount = "37,000+",
    headline = "The Only Pee Pad That Requires No Training And Lasts Over A Year",
    ctaLabel = "Choose Bundle",
    Video = "https://cdn.shopify.com/videos/c/o/v/c82df8c52e464ae3850ae2f882a65362.mp4",
    heroImageAlt = "Dog standing at a raised feeding stand on a PuppyPad",
}) {
    return (
        <div className="pp-hero-page" id="top">
            <header className="pp-hero-page__nav">
                <Navbar />
            </header>

            <section className="pp-hero" id="product-section">
                <div className="pp-hero__content">
                    <div className="pp-hero__rating">
                        <div className="pp-hero__stars" aria-hidden="true">

                            <img src={five_star_rating} alt="" />
                        </div>
                        <span className="pp-hero__rating-text">
                            {reviewCount} 5 STAR REVIEWS
                        </span>
                    </div>

                    <h1 className="pp-hero__headline">{headline}</h1>

                    <ul className="pp-hero__list">
                        {CHECKLIST.map((item, i) => (
                            <li key={i}>
                                <span className="pp-hero__check">
                                    <img src={Checkmark} alt="" />
                                </span>
                                <span>
                                    {item.bold && <strong>{item.bold}</strong>}
                                    {item.rest}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <a className="pp-hero__cta" href="#bundles">
                        <span>{ctaLabel}</span>
                        <span className="pp-hero__cta-icon">
                            <img src={Arrow} alt="" />
                        </span>
                    </a>

                    <div className="pp-hero__guarantee">
                        <img src={Checkmark} alt="" />
                        <span>90 DAY RISK FREE GUARANTEE</span>
                    </div>
                </div>

                <div className="pp-hero__media">
                    <video
                        src={Video}
                        autoPlay
                        muted
                        loop
                        preload="auto"
                    />
                </div>
            </section >
        </div >
    );
}