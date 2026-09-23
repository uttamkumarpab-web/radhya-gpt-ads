import OpenFormButton from "./OpenFormButton";

const SPECIALIZATIONS = [
  "Marketing",
  "Human Resource Management",
  "Finance",
  "Information Technology",
  "Business Management",
  "Operations",
  "Logistics & Supply Chain Management",
  "Analytics & Data Science",
  "Agri Operations Management",
  "International Business",
  "Business Analytics",
  "Hospital and Health Care Management",
];

export default function Specializations() {
  return (
    <div className="bg-white text-[#3c087e]">
      <div className="max-w-7xl mx-auto px-8 py-16 spec-off">
        <h2 className="text-[24px] md:text-[30px] font-bold text-[#3c087e] mb-4 text-center">
          Specializations Offered
        </h2>

        <div className="offerd-main">
          {SPECIALIZATIONS.map((specialization) => (
            <div key={specialization} className="offerd-box">
              <p>{specialization}</p>
            </div>
          ))}
        </div>
        {/* Bottom CTA */}
        <div className="mt-10 flex justify-center">
          <OpenFormButton
            id="cta-specializations-apply-now"
            label="Apply now"
            className="rounded-xl bg-[#3C087E] px-7 py-3 text-sm font-bold text-[#FFFFFF] shadow-[0_10px_24px_#3C087E33] transition-all duration-300 hover:scale-[1.03] hover:bg-[#EEA727] md:px-9 md:py-3.5 md:text-base"
          >
            Apply now
          </OpenFormButton>
        </div>

      </div>
    </div>
  );
}
