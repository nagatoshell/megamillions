import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import { useMemo } from "react";
import video from "../assets/aboutus.mp4";

const testimonials = [
  {
    name: "Sarah Johnson",
    review:
      "I received $500,000 in grant money and it helped me start my small business!",
    rating: 5,
    amount: 500000,
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "James Brown",
    review:
      "MegaMillions helped me get a $300,000 education grant for college.",
    rating: 4,
    amount: 300000,
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emily Davis",
    review:
      "I never thought I’d qualify, but I got $250,000 in assistance. Life-changing!",
    rating: 5,
    amount: 250000,
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Robert Martinez",
    review: "The grant helped me reopen my restaurant after tough times.",
    rating: 5,
    amount: 450000,
    img: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Amanda Taylor",
    review: "This program gave my family financial stability again.",
    rating: 5,
    amount: 350000,
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Daniel Wilson",
    review:
      "I received $200,000 that helped pay off debts and rebuild my life.",
    rating: 4,
    amount: 200000,
    img: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Olivia Anderson",
    review:
      "I was shocked when I received the grant approval email. Incredible!",
    rating: 5,
    amount: 600000,
    img: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    name: "Michael Thompson",
    review: "Unitedway truly cares about helping communities grow.",
    rating: 4,
    amount: 280000,
    img: "https://randomuser.me/api/portraits/men/21.jpg",
  },
];

const Testimonials = () => {
  // Shuffle testimonials and show only 3
  const randomTestimonials = useMemo(() => {
    return [...testimonials].sort(() => Math.random() - 0.5).slice(0, 3);
  }, []);

  return (
    <div className="bg-gray-100 py-12">
      {/* Video Section */}
      <div className="w-full max-w-4xl mx-auto mb-8 rounded-lg shadow-lg overflow-hidden">
        <ReactPlayer
          url={video}
          playing
          loop
          muted
          controls
          width="100%"
          height="400px"
        />
      </div>

      {/* Heading */}
      <motion.h2
        className="text-3xl md:text-4xl font-semibold text-center mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        What Our Beneficiaries Say
      </motion.h2>

      {/* Testimonial Cards */}
      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4">
        {randomTestimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <img
              src={testimonial.img}
              className="w-[90px] h-[90px] rounded-full mx-auto mb-3 object-cover"
            />

            <h3 className="font-semibold text-lg text-center">
              {testimonial.name}
            </h3>

            <p className="text-sm font-bold text-blue-700 text-center">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(testimonial.amount)}{" "}
              Grant Received
            </p>

            <p className="text-gray-600 mt-3 text-center text-sm">
              {testimonial.review}
            </p>

            <div className="flex justify-center mt-3">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
