import React from 'react';

const REVIEWS = [
   {
      id: 1,
      name: "Emily Carter",
      image: "https://readymadeui.com/team-2.webp",
      title: "Quick and Easy Experience",
      rating: 4,
      date: "2 days ago",
      content: "Everything was seamless. Ordering was simple and the response time was super fast. Highly recommend to anyone looking for convenience and speed."
   },
   {
      id: 2,
      name: "Daniel Kim",
      image: "https://readymadeui.com/team-3.webp",
      title: "Fantastic Support",
      rating: 5,
      date: "4 days ago",
      content: "Had a few questions before ordering and the customer service team was amazing—super responsive and knowledgeable. It really made a difference!"
   },
   {
      id: 3,
      name: "Priya Singh",
      image: "https://readymadeui.com/team-4.webp",
      title: "Exceeded Expectations",
      rating: 4,
      date: "5 days ago",
      content: "From start to finish, I felt taken care of. The ordering process was smooth and the delivery was right on time. Would definitely use this service again."
   },
   {
      id: 4,
      name: "Liam Brown",
      image: "https://readymadeui.com/team-5.webp",
      title: "Highly Recommended",
      rating: 3,
      date: "7 days ago",
      content: "Very impressed by the quality and speed. It’s rare to see this level of dedication these days. I’ll definitely be coming back."
   }
];

export default function Reviews() {
   return (
      <section className="px-4 md:px-8 mt-6" aria-labelledby="reviews-heading">
         <div className="max-w-4xl mx-auto">
            <h2 id="reviews-heading" className="text-2xl font-bold text-slate-900 mb-6">
               Customer reviews
            </h2>

            <ul className="divide-y divide-slate-300">
               {REVIEWS.map((review) => (
                  <li key={review.id} className="py-6">
                     <div className="flex items-center gap-4">
                        <div className="shrink-0">
                           <img
                              src={review.image}
                              className="object-cover rounded-full w-12 h-12 border border-slate-300"
                              alt={review.name}
                           />
                        </div>

                        <div>
                           <p className="text-sm text-slate-900 font-semibold">
                              {review.name}
                           </p>
                           <div className="flex items-center gap-2 mt-2">
                              <span
                                 aria-label="Verified buyer"
                                 className="w-4 h-4 flex items-center justify-center rounded-full bg-green-600/20"
                              >
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-2 h-2 fill-green-700"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                 >
                                    <path d="M9.225 20.656a1.206 1.206 0 0 1-1.71 0L.683 13.823a1.815 1.815 0 0 1 0-2.566l.855-.856a1.815 1.815 0 0 1 2.567 0l4.265 4.266L19.895 3.14a1.815 1.815 0 0 1 2.567 0l.855.856a1.815 1.815 0 0 1 0 2.566z" />
                                 </svg>
                              </span>
                              <p className="text-slate-600 text-xs">Verified Buyer</p>
                           </div>
                        </div>
                     </div>

                     <div className="mt-6">
                        <h3 className="text-slate-900 text-base font-semibold">
                           {review.title}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-2" aria-label={`Rated ${review.rating} out of 5 stars`}>
                           {[...Array(5)].map((_, index) => (
                              <svg
                                 key={index}
                                 xmlns="http://www.w3.org/2000/svg"
                                 className={`size-3.5 ${index < review.rating ? "fill-[#ffc107]" : "fill-[#CED5D8] " }`}
                                 viewBox="0 0 24 24"
                                 aria-hidden="true"
                              >
                                 <path d="m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z" />
                              </svg>
                           ))}
                           <p className="text-slate-500 text-sm !ml-1 font-medium">
                              {review.date}
                           </p>
                        </div>

                        <div className="mt-4">
                           <p className="text-slate-600 text-sm leading-relaxed">
                              {review.content}
                           </p>
                        </div>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
      </section>
   );
};
