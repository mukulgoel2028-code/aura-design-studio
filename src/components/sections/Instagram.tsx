import Image from "next/image";

export default function Instagram() {
  const posts = [
    {
      image: "/sequence/frames1/frames1_0045.jpg",
      caption: "Natural sunlight illuminating fluted travertine textures.",
      likes: "1,240",
    },
    {
      image: "/sequence/frames2/frames2_0060.jpg",
      caption: "Precision millwork joinery in natural smoked Austrian oak.",
      likes: "982",
    },
    {
      image: "/sequence/frames1/frames1_0180.jpg",
      caption: "Curating raw materiality for our Tribeca client residence.",
      likes: "2,415",
    },
    {
      image: "/sequence/frames2/frames2_0180.jpg",
      caption: "Monolithic Calacatta Viola details in high-noon illumination.",
      likes: "1,890",
    },
    {
      image: "/sequence/frames1/frames1_0250.jpg",
      caption: "Final styling touches before client handover in Mayfair.",
      likes: "3,110",
    },
    {
      image: "/sequence/frames2/frames2_0280.jpg",
      caption: "The quiet drama of concealed architectural lighting.",
      likes: "1,670",
    },
  ];

  return (
    <section
      id="instagram"
      className="w-full py-24 md:py-32 bg-cream px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="font-body text-xs tracking-[0.25em] text-text-muted uppercase">
                Behind the Scenes
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-charcoal font-normal">
              Atelier Chronicles
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-charcoal font-body text-sm font-medium hover:text-gold transition-colors"
          >
            <span>@aurainteriors on Instagram</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>

        {/* 6-Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-xl overflow-hidden bg-charcoal/5 cursor-pointer shadow-sm"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="text-right">
                  <span className="font-body text-[10px] text-cream/90 flex items-center justify-end space-x-1">
                    <span>♥</span>
                    <span>{post.likes}</span>
                  </span>
                </div>
                <p className="font-body text-[10px] line-clamp-3 text-cream/90 leading-tight">
                  {post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
