export default function Approvals() {
 const approvals = [
  {
    title: "UGC-DEB Recognised",
    image: "/images/ugc.webp",
    description:
      "Recognised by the University Grants Commission – Distance Education Bureau for eligible online degree programmes.",
  },
  {
    title: "AICTE Approved",
    image: "/images/aicte.webp",
    description:
      "AICTE approval or recognition is applicable to programmes and institutions as per the prevailing regulatory requirements.",
  },
  {
    title: "NAAC Accredited",
    image: "/images/naac.webp",
    description:
      "Universities may hold NAAC accreditation based on their institutional assessment and accreditation status.",
  },
  {
    title: "NIRF Ranked",
    image: "/images/nirf.webp",
    description:
      "Compare universities based on their National Institutional Ranking Framework (NIRF) ranking and institutional profile.",
  },
  {
    title: "WES Recognised",
    image: "/images/wes.webp",
    description:
      "World Education Services (WES) evaluation can help assess eligible academic credentials for international education and employment purposes.",
  },
  {
    title: "AIU Recognised",
    image: "/images/aiu.webp",
    description:
      "AIU recognition and equivalence may apply to eligible qualifications according to the Association of Indian Universities guidelines.",
  },
];
  return (
    <section className="w-full bg-white py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Section Heading */}
          <h2 className="text-[24px] md:text-[30px] font-bold text-[#3c087e] mb-4">
          Accreditation & Approvals
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {approvals.map((item, index) => (
            <div
              key={index}
              className="bg-[#F1F1F1] rounded-lg min-h-[145px] p-4 md:p-5 transition-all duration-300 hover:shadow-md"
            >
              {/* Icon */}
              <div className="w-[62px] h-[62px] bg-white rounded-lg flex items-center justify-center mb-2">
                <img
                  src={item.image}
                  alt={`${item.title} icon`}
                  className="w-[48px] h-[48px] object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-[14px] md:text-[15px] font-bold text-[#3C087E] leading-5">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] md:text-[14px] text-[#1F2937] leading-5 mt-1">
                {item.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}