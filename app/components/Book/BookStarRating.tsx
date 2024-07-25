import React from "react";
import clsx from "clsx";

const BookStarRating = ({ readOnly = true, ratingClassName = "rating-md" }) => {
    return (
        <div
            className={clsx(
                "rating rating-half",
                readOnly && "pointer-events-none",
                ratingClassName
            )}
        >
            <input type="radio" name="rating-10" className="rating-hidden" />
            <input
                type="radio"
                name="rating-10"
                className="mask mask-star-2 mask-half-1 bg-custom-static-2 brightness-90 saturate-50 -hue-rotate-[20deg]"
                disabled={readOnly}
            />
            <input
                type="radio"
                name="rating-10"
                className="mask mask-star-2 mask-half-2 bg-custom-static-2 brightness-90 saturate-50 -hue-rotate-[20deg]"
                disabled={readOnly}
            />
            <input
                type="radio"
                name="rating-10"
                className="mask mask-star-2 mask-half-1 bg-custom-static-2 saturate-50 -hue-rotate-[5deg]"
                defaultChecked
                disabled={readOnly}
            />
            <input
                type="radio"
                name="rating-10"
                className="mask mask-star-2 mask-half-2 bg-custom-static-2 saturate-50 -hue-rotate-[5deg]"
                disabled={readOnly}
            />
            <input
                type="radio"
                name="rating-10"
                className="mask mask-star-2 mask-half-1 bg-custom-static-2 brightness-110 saturate-100"
                disabled={readOnly}
            />
            <input
                type="radio"
                name="rating-10"
                className="mask mask-star-2 mask-half-2 bg-custom-static-2 brightness-110 saturate-100"
                disabled={readOnly}
            />
            <input
                type="radio"
                name="rating-10"
                className="mask mask-star-2 mask-half-1 bg-custom-static-2 brightness-125 saturate-150"
                disabled={readOnly}
            />
            <input
                type="radio"
                name="rating-10"
                className="mask mask-star-2 mask-half-2 bg-custom-static-2 brightness-125 saturate-150"
                disabled={readOnly}
            />
            <input
                type="radio"
                name="rating-10"
                className="mask mask-star-2 mask-half-1 bg-custom-static-2 brightness-125 saturate-150 hue-rotate-[15deg]"
                disabled={readOnly}
            />
            <input
                type="radio"
                name="rating-10"
                className="mask mask-star-2 mask-half-2 bg-custom-static-2 brightness-125 saturate-150 hue-rotate-[15deg]"
                disabled={readOnly}
            />
        </div>
    );
};

export default BookStarRating;
