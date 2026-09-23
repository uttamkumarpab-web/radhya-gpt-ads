import OpenFormButton from "./OpenFormButton";

export default function TopUniversities() {
  const universities = [
    {
      name: "NMIMS Online",
      image: "/images/nmims.webp",
      specializations: "10 specializations",
      accreditation: "NAAC A++ • UGC • DEB • AICTE",
      duration: "2 Years",
      fees: "₹ 2,20,000",
    },
    {
      name: "Amity University Online",
      image: "/images/amity.webp",
      specializations: "12 specializations",
      accreditation: "NAAC A+ • UGC • DEB • AICTE",
      duration: "2 Years",
      fees: "₹ 2,50,000",
    },
    {
      name: "Manipal Jaipur Online",
      image: "/images/muj.webp",
      specializations: "13 specializations",
      accreditation: "NAAC A+ • UGC • DEB • AICTE",
      duration: "2 Years",
      fees: "₹ 1,80,000",
    }
  ];

  return (
    <section className="w-full bg-[#fffdf8] px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">

        {/* Section Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-[24px] font-bold leading-tight text-[#3C087E] md:text-[30px]">
            Top Online MBA Universities
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-[#52647B] md:text-base">
            Compare leading universities offering Online MBA programmes,
            specialisations, fees and admission options.
          </p>
        </div>

        {/* University Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {universities.map((university, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-[14px] border border-[#E7E1EF] bg-white shadow-[0_8px_24px_#3C087E12] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_#3C087E1C]"
            >
              {/* Image */}
              <div className="relative h-[155px] w-full overflow-hidden bg-[#F4F0F8] sm:h-[145px]">
                <img
                  src={university.image}
                  alt={`${university.name} Online MBA`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />

                {/* Specialization Badge */}
                <span className="absolute left-2.5 top-2.5 rounded-md bg-[#EEA727] px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm">
                  {university.specializations}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-4 bg-[#fffdf8]">

                {/* University Name */}
                <h3 className="text-[15px] font-bold leading-tight text-[#17233C]">
                  {university.name}
                </h3>

                {/* Details */}
                <div className="mt-3 space-y-2">

                  <div className="flex items-start gap-2">
                    <span className="mt-[1px] text-[12px] text-[#EEA727]">
                      ✓
                    </span>

                    <span className="text-[11px] leading-4 text-[#52647B]">
                      {university.accreditation}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[#EEA727]">
                      ✓
                    </span>

                    <span className="text-[11px] text-[#52647B]">
                      Duration: {university.duration}
                    </span>
                  </div>

                   <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[#EEA727]">
                      ✓
                    </span>

                    <span className="text-[11px] text-[#52647B]">
                      Fees: {university.fees}
                    </span>
                  </div>

                </div>

                {/* Compare Button */}
                <OpenFormButton
                  id={`cta-compare-${university.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  label={`Compare ${university.name}`}
                  className="mt-4 w-full rounded-lg bg-[#EEA727] px-3 py-2 text-[11px] font-bold text-white transition-all duration-300 hover:bg-[#3C087E] hover:text-[#FFFFFF]"
                >
                  Compare Now
                </OpenFormButton>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex justify-center">
          <OpenFormButton
            id="cta-compare-all-universities"
            label="Compare All Online MBA Universities"
            className="rounded-xl bg-[#3C087E] px-7 py-3 text-sm font-bold text-[#FFFFFF] shadow-[0_10px_24px_#3C087E33] transition-all duration-300 hover:scale-[1.03] hover:bg-[#EEA727] md:px-9 md:py-3.5 md:text-base"
          >
            Compare All Online MBA Universities
          </OpenFormButton>
        </div>

      </div>
    </section>
  );
}