import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

const reviews = [
    {
        name: "Arjun",
        username: "@arjun",
        body: "I recently purchased a bike from Big Swing Honda and I must say the experience was amazing. The staff was very helpful and they guided me through the entire process. I would definitely recommend them to anyone looking to buy a bike.",
        img: "https://avatars.githubusercontent.com/u/433734?v=4",
    },
    {
        name: "Karan",
        username: "@karan",
        body: "I was in need of some bike servicing and I went to Big Swing Honda. The service was top notch and the staff was very friendly. They explained everything in detail and also gave me some useful tips. I would definitely go there again for any bike related needs.",
        img: "https://avatars.githubusercontent.com/u/443634?v=4",
    },
    {
        name: "Ravi",
        username: "@ravi",
        body: "I recently purchased a scooter from Big Swing Honda and I must say the experience was amazing. The staff was very helpful and they guided me through the entire process. I would definitely recommend them to anyone looking to buy a scooter.",
        img: "https://avatars.githubusercontent.com/u/433734?v=4",
    },
    {
        name: "Vikas",
        username: "@vikas",
        body: "I was in need of some scooter servicing and I went to Big Swing Honda. The service was top notch and the staff was very friendly. They explained everything in detail and also gave me some useful tips. I would definitely go there again for any scooter related needs.",
        img: "https://avatars.githubusercontent.com/u/443634?v=4",
    },
    {
        name: "Anil",
        username: "@anil",
        body: "I recently purchased a bike from Big Swing Honda and I must say the experience was amazing. The staff was very helpful and they guided me through the entire process. I would definitely recommend them to anyone looking to buy a bike.",
        img: "https://avatars.githubusercontent.com/u/433734?v=4",
    },
    {
        name: "Rohan",
        username: "@rohan",
        body: "I was in need of some bike servicing and I went to Big Swing Honda. The service was top notch and the staff was very friendly. They explained everything in detail and also gave me some useful tips. I would definitely go there again for any bike related needs.",
        img: "https://avatars.githubusercontent.com/u/443634?v=4",
    },
    {
        name: "Sandeep",
        username: "@sandeep",
        body: "I recently purchased a scooter from Big Swing Honda and I must say the experience was amazing. The staff was very helpful and they guided me through the entire process. I would definitely recommend them to anyone looking to buy a scooter.",
        img: "https://avatars.githubusercontent.com/u/433734?v=4",
    },
    {
        name: "Amit",
        username: "@amit",
        body: "I was in need of some scooter servicing and I went to Big Swing Honda. The service was top notch and the staff was very friendly. They explained everything in detail and also gave me some useful tips. I would definitely go there again for any scooter related needs.",
        img: "https://avatars.githubusercontent.com/u/443634?v=4",
    },
    {
        name: "Rajesh",
        username: "@rajesh",
        body: "I recently purchased a bike from Big Swing Honda and I must say the experience was amazing. The staff was very helpful and they guided me through the entire process. I would definitely recommend them to anyone looking to buy a bike.",
        img: "https://avatars.githubusercontent.com/u/433734?v=4",
    },
    {
        name: "Vivek",
        username: "@vivek",
        body: "I was in need of some bike servicing and I went to Big Swing Honda. The service was top notch and the staff was very friendly. They explained everything in detail and also gave me some useful tips. I would definitely go there again for any bike related needs.",
        img: "https://avatars.githubusercontent.com/u/443634?v=4",
    },
    {
        name: "Rohan",
        username: "@rohan",
        body: "I recently purchased a scooter from Big Swing Honda and I must say the experience was amazing. The staff was very helpful and they guided me through the entire process. I would definitely recommend them to anyone looking to buy a scooter.",
        img: "https://avatars.githubusercontent.com/u/433734?v=4",
    },
    {
        name: "Sachin",
        username: "@sachin",
        body: "I was in need of some scooter servicing and I went to Big Swing Honda. The service was top notch and the staff was very friendly. They explained everything in detail and also gave me some useful tips. I would definitely go there again for any scooter related needs.",
        img: "https://avatars.githubusercontent.com/u/433734?v=4",
    },
];

const firstRow = reviews.slice(0, reviews.length / 3);
const secondRow = reviews.slice(reviews.length / 3, 2 * reviews.length / 3);
const thirdRow = reviews.slice(2 * reviews.length / 3);

const ReviewCard = ({
    img,
    name,
    username,
    body,
}) => {
    return (
        <figure
            className={cn(
                "relative h-fit w-full  cursor-pointer overflow-hidden rounded-xl border p-4",

                "border-gray-50/[.1] bg-gray-50/[.10] hover:bg-gray-50/[.15]",
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm text-white">{body}</blockquote>
        </figure>
    );
};

export default function Testimonial() {
    return (
        <>
            <div className="z-10 w-full p-4 pt-16 mx-auto max-w-7xl ">
                <h1 className="text-[1.8rem] md:text-[3rem] font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                    Loved by thousands of people
                </h1>
                <p className="max-w-lg mx-auto mt-2 font-normal text-center text-md text-neutral-300">
                    Here's what some of our users have to say about Honda motors.
                </p>
            </div>
            <div className="columns-1 h-[40rem] overflow-hidden gap-5 lg:gap-8 mt-4   mx-4 sm:mx-10 md:mx-28 lg:mx-36  relative sm:columns-2 lg:columns-3">
                <Marquee pauseOnHover vertical className="[--duration:35s]">
                    {firstRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <Marquee pauseOnHover vertical className="[--duration:40s] ">
                    {secondRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <Marquee pauseOnHover vertical className="[--duration:30s]">
                    {thirdRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <div className="absolute inset-x-0 top-0 pointer-events-none h-1/4 bg-gradient-to-b from-mainBg "></div>
                <div className="absolute inset-x-0 bottom-0 pointer-events-none h-1/4 bg-gradient-to-t from-mainBg "></div>
            </div>
        </>
    );
}
