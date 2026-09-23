import LeadForm from "./LeadForm";
import OpenFormButton from "./OpenFormButton";

const badges = [
    { img: "/images/ugc.webp", text: "UGC Entitled" },
    { img: "/images/aicte.webp", text: "AICTE Approved" },
    { img: "/images/naac.webp", text: "NAAC A++ Accredited" },
    { img: "/images/wes.webp", text: "WES Recognized" },
  ];

export default function HeroSection() {
  return (
    <div
      className="relative w-full text-black px-0 sm:px-4 md:px-0 banner-wrapper bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/heroBanner.png')" }}
    >
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="relative z-10 max-w-7xl px-4 sm:px-6 md:px-4 lg:px-4 mx-auto pt-12 pb-16 sm:pb-20 grid grid-cols-1 md:grid-cols-[3fr_2fr] justify-center items-center gap-10 md:gap-8 first-banner">

        {/* LEFT SECTION */}
        <div className="left w-full">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-[#ffffff] border border-white/25 rounded-full px-5 py-1 backdrop-blur-sm">
            <span className="text-[#FFB51B] text-lg">★</span>
            <span className="text-sm text-[#3C087E] font-semibold">
              Online MBA Guidance & Comparison
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-bold w-full text-[30px] md:text-4xl lg:text-[52px] leading-[1.12] text-[#ffffff] my-3">
            Explore <span className="text-[#EEA727]">Online MBA</span> from top universities in India
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base leading-relaxed text-white mt-5 mb-5 max-w-2xl">
            Compare Online MBA fees, specialisations, eligibility and programme
  details from top universities, then get a personalised shortlist based
  on your career goals.
          </p>

          {/* Pointers */}
          <div className="pointers">
            <ul className="list-none space-y-2">
              <li className="flex items-start gap-2 text-sm md:text-base text-white">
                <span className="text-[#FFB51B] font-bold text-lg leading-5">
                  ✓
                </span>
                <span>
                  Expert Guidance
                </span>
              </li>

              <li className="flex items-start gap-2 text-sm md:text-base text-white">
                <span className="text-[#FFB51B] font-bold text-lg leading-5">
                  ✓
                </span>
                <span>
                  UGC-DEB Approved Universities
                </span>
              </li>

              <li className="flex items-start gap-2 text-sm md:text-base text-white">
                <span className="text-[#FFB51B] font-bold text-lg leading-5">
                  ✓
                </span>
                <span>
                  Free counselling and application assistance
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-4 bg-white rounded-2xl p-2 pr-2 max-w-xl shadow-sm">
  <div className="grid grid-cols-4 gap-2 md:gap-4">
    {badges.map((item, i) => (
      <div
        key={i}
        className="flex flex-col md:flex-row items-center justify-center text-center md:text-left"
      >
        <img
          src={`${item.img}`}
          alt={item.text}
          className="w-8 h-8 md:w-14 md:h-14 object-contain flex-shrink-0"
        />

        <span className="leading-tight text-[10px] md:text-xs font-semibold text-gray-700">
          {(() => {
            const words = item.text.split(" ");
            const lastWord = words.pop();

            return (
              <>
                {words.join(" ")}
                <br />
                {lastWord}
              </>
            );
          })()}
        </span>
      </div>
    ))}
  </div>
</div>

{/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 mt-6">
            <OpenFormButton
              id="cta-hero-apply-now"
              label="Apply Now"
              className="inline-flex items-center justify-center rounded-lg bg-[#3c087e] border-white/70 px-7 py-3 text-sm md:text-base font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-[#eea727]"
            >
              Apply Now
            </OpenFormButton>
            <OpenFormButton
              id="cta-hero-download-brochure"
              label="Download Brochure"
              className="inline-flex items-center justify-center rounded-lg border-white/70 bg-[#3c087e] px-7 py-3 text-sm md:text-base font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-[#eea727]"
            >
              Download Brochure
            </OpenFormButton>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div
          className="right w-full flex justify-end max-sm:justify-center max-sm:mt-5"
          id="main-form"
        >
          <div className="w-full scroll-mt-24 ">
            <LeadForm />
          </div>
        </div>
      </div>
    </div>
  );
}