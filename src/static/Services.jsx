import React from "react";

const cardsData = [
    {
        id: 1,
        title: "Party",
        description: "We work with clients of all ages to create the best party event of their dreams",
        buttonText: "Discover",
        imageUrl: "https://cdn.prod.website-files.com/64d4cc69bedac072565f73f9/64dde806040e946dbbad3f3a_pexels-orione-conceic%CC%A7a%CC%83o-2983463-p-1600.jpg",
        icon: "🎉",
    },
    {
        id: 2,
        title: "Wedding",
        description: "Create unforgettable wedding memories with our expert planning and decoration services.",
        buttonText: "Explore",
        imageUrl: "https://cdn.prod.website-files.com/64d4cc69bedac072565f73f9/64dde9a4c07ba4c4234f3bcb_pexels-karolina-grabowska-5716283%20(1)%20(1)-p-1600.jpg",
        icon: "💍",
    },
    {
        id: 3,
        title: "Corporate Event",
        description: "Plan professional and seamless corporate events with our specialized services.",
        buttonText: "Learn More",
        imageUrl: "https://cdn.prod.website-files.com/64d4cc69bedac072565f73f9/64dded779a064f7034b8b716_pexels-rone%CC%82-ferreira-2735037-p-1600.jpg",
        icon: "🏢",
    },
];

const Card = ({ title, description, buttonText, imageUrl, icon }) => {
    return (
        <div className="relative w-[800px] h-[350px] rounded-xl overflow-hidden shadow-lg">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white p-6">
                <div className="text-5xl">{icon}</div>
                <h2 className="text-2xl font-bold mt-2">{title}</h2>
                <p className="text-center mt-2">{description}</p>
                <button className="mt-4 px-6 py-2 bg-white text-black rounded-lg shadow-md hover:bg-gray-200 transition">
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

const Services = () => {
    return (
        <div className="flex flex-col items-center gap-6 p-6">

            {cardsData.map((card) => (
                <Card key={card.id} {...card} />
            ))}
        </div>
    );
};

export default Services;
