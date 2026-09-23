import OpenFormButton from "./OpenFormButton";

const FAQS = [
  {
    question: "1. What is an Online MBA?",
    answer:
      "An Online MBA is a postgraduate management program that allows students and working professionals to earn an MBA degree through online learning. The program typically covers subjects such as Marketing, Finance, Human Resources, Operations, Business Analytics and Strategic Management.",
  },
  {
    question: "2. What is the duration of an Online MBA?",
    answer:
      "A standard Online MBA program generally has a duration of two years and is divided into multiple semesters. Students may need to complete the prescribed coursework, assignments, examinations and other academic requirements during the program.",
  },
  {
    question: "3. What is the eligibility for an Online MBA?",
    answer:
      "Generally, candidates must have a bachelor's degree or equivalent qualification from a recognised university. Eligibility requirements, minimum marks and other admission conditions can vary between universities, so applicants should check the specific requirements of their preferred institution.",
  },
  {
    question: "4. Is an Online MBA recognised?",
    answer:
      "Recognition depends on the university and the specific program. Students should verify the university's current recognition or entitlement status and the applicable regulatory approvals for the academic session in which they plan to enrol.",
  },
  {
    question: "5. How can I apply for an Online MBA?",
    answer:
      "The admission process generally involves selecting a university and program, checking eligibility, completing the online application form, submitting the required documents and paying the applicable admission or registration fee. The exact process varies by university.",
  },
  {
    question: "6. Can working professionals pursue an Online MBA?",
    answer:
      "Yes. Online MBA programs are designed to provide flexible learning, making them suitable for many working professionals who want to pursue higher education while continuing their careers. Students can typically access lectures, study materials and other learning resources online.",
  },
];

export default function FaqSection() {
  return (
    <section className="bg-white px-6 lg:px-20 py-16 fa1-main">
      
      {/* Section Heading */}
      <h2 className="text-[24px] md:text-[30px] font-bold text-[#3c087e] mb-10 text-center">
        Frequently Asked Questions
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[40%_60%] gap-10 items-stretch">

        {/* Left Content */}
        <div className="flex items-center h-full">
          <div className="text-gray-700 p-8 rounded-lg w-full max-w-md bg-[#fffdf8]">
            
            <h3 className="text-xl font-semibold mb-3">
              Still having questions?
              <br />
              Reach out to Us
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Get expert guidance on Online MBA fees, eligibility,
              specialisations, universities and admission options.
            </p>

            <OpenFormButton
              id="cta-faq-apply-now"
              label="Apply Now"
              className="rounded bg-[#3c087e] px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors duration-300 hover:bg-[#eea727]"
            >
              Apply Now
            </OpenFormButton>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="flex flex-col space-y-3 w-full">
          {FAQS.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-lg overflow-hidden bg-[#fffdf8] open:bg-[#fffdf8] transition-all"
            >
              <summary className="list-none cursor-pointer p-4 flex justify-between items-center gap-3">
                
                <span className="font-semibold text-gray-900">
                  {faq.question}
                </span>

                <svg
                  className="w-5 h-5 shrink-0 text-gray-700 transition-transform duration-300 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>

              </summary>

              <div className="px-4 pb-4 text-sm text-gray-700 leading-relaxed">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}