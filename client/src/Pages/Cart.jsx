import React, { useState } from "react";
import "./Cart.css";

const OFFERS = [
    {
        id: 1,
        name: "1 PUPPYPAD",
        now: "$30",
        strike: null,
        save: null,
        imgAlt: "1 PuppyPad",
        imgSrc: "https://placehold.co/80x90/e7e2da/6b6b6b?text=Pad",
    },
    {
        id: 2,
        name: "BUY 3 GET 3 FREE",
        now: "$90",
        strike: "$180",
        save: "SAVE $90",
        imgAlt: "Buy 3 Get 3 Free",
        imgSrc: "https://placehold.co/120x90/e7e2da/6b6b6b?text=Pads",
    },
    {
        id: 3,
        name: "BUY 2 GET 1 FREE",
        now: "$60",
        strike: "$90",
        save: "SAVE $30",
        imgAlt: "Buy 2 Get 1 Free",
        imgSrc: "https://placehold.co/100x90/e7e2da/6b6b6b?text=Pads",
    },
];

const MONTHS = [
    { month: "AUGUST", detail: "Sold Out (4,780 PuppyPads Were Sold)", current: false },
    { month: "SEPTEMBER", detail: "83% Sold (4,512 out of 5,400 PuppyPads)", current: true },
];

export default function Cart() {
    const [selectedId, setSelectedId] = useState(2);
    const selectedOffer = OFFERS.find((o) => o.id === selectedId);

    return (
        <div className="big-wrapper">
            <div className="cart-wrap">
                <div className="cart-step-label">
                    <b>3. Select Your Offer:</b> Buy 3 Get 3 Free
                </div>
                <div className="cart-subtext">
                    Most Customers Go For The 6 Pack, <a href="#top">Click To See Why.</a>
                </div>

                <div className="cart-offers">
                    {OFFERS.map((offer) => (
                        <button
                            key={offer.id}
                            type="button"
                            className={`cart-offer${offer.id === selectedId ? " selected" : ""}`}
                            onClick={() => setSelectedId(offer.id)}
                        >
                            {offer.id === selectedId && <span className="cart-offer-check">✓</span>}
                            <div className="cart-offer-img">
                                <img src={offer.imgSrc} alt={offer.imgAlt} />
                            </div>
                            <h3>{offer.name}</h3>
                            <div className="cart-price">
                                {offer.strike && <span className="strike">{offer.strike}</span>}
                                <span className="now">{offer.now}</span>
                            </div>
                            {offer.save && <div className="cart-save">{offer.save}</div>}
                        </button>
                    ))}
                </div>

                <button type="button" className="cart-add-to-cart">
                    <span>ADD TO CART - {selectedOffer.now}</span>
                    <span className="cart-circle">→</span>
                </button>

                <div className="cart-badges">
                    <span>
                        <span className="cart-check">✓</span> 90 DAY RISK FREE GUARANTEE
                    </span>
                    <span>
                        <span className="cart-check">✓</span> 2-5 DAY SHIPPING FROM WISCONSIN
                    </span>
                </div>

                <div className="cart-stock-box">
                    <div className="cart-stock-alert">
                        <div className="cart-icon">!</div>
                        <p>
                            We are selling out more than expect as we only have limited stock
                            each month. <b>Order now before we run out again!</b>
                        </p>
                    </div>

                    {MONTHS.map((m) => (
                        <div
                            key={m.month}
                            className={`cart-month-row${m.current ? " current" : ""}`}
                        >
                            <span className="cart-month">{m.month}</span>
                            <span>{m.detail}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}