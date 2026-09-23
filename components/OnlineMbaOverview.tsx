export default function OnlineMbaOverview() {
  return (
    <section className="w-full bg-white py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Overview Table */}
        <div className="w-full overflow-x-auto rounded-lg shadow-md border border-gray-200">
          <table className="w-full min-w-[700px] border-collapse text-center">
            <thead>
              <tr className="text-[#E8E8E8] bg-[#3C087E]">
                <th className="px-5 py-4 text-sm md:text-base font-bold">
                  Degree
                </th>
                <th className="px-5 py-4 text-sm md:text-base font-bold">
                  Full Form
                </th>
                <th className="px-5 py-4 text-sm md:text-base font-bold">
                  Duration
                </th>
                <th className="px-5 py-4 text-sm md:text-base font-bold">
                  Eligibility
                </th>
                <th className="px-5 py-4 text-sm md:text-base font-bold">
                  Semester Fee
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-[#f3f4f5] text-gray-600">
                <td className="px-5 py-5 text-sm md:text-base font-semibold">
                  Online MBA
                </td>

                <td className="px-5 py-5 text-sm md:text-base font-medium">
                  Master of Business
                  <br />
                  Administration
                </td>

                <td className="px-5 py-5 text-sm md:text-base font-medium">
                  2 Years
                  <br />
                (4 Semesters)
                </td>

                <td className="px-5 py-5 text-sm md:text-base font-medium">
                  Graduation
                  <br />
                    (Any Stream ~50%)
                </td>

                <td className="px-5 py-5 text-sm md:text-base font-medium">
                  Varies by University
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Content */}
        <div className="mt-8 md:mt-10">

          <h2 className="text-[24px] md:text-[30px] font-bold text-[#3c087e] mb-4">
            What is an Online MBA?
          </h2>

          <div className="space-y-4 text-sm md:text-base leading-7 text-gray-700">

            <p>
              An <strong>Online MBA</strong> is a postgraduate management
              programme that allows students and working professionals to
              pursue a Master of Business Administration through online
              learning. The programme covers essential areas of business and
              management such as Marketing, Finance, Human Resources,
              Operations, Business Analytics and Strategic Management.
              Students can attend lectures, access study materials, complete
              assignments and appear for assessments through an online
              learning platform.
            </p>

            <p>
              An Online MBA is generally designed to provide the flexibility
              required by students, working professionals and individuals who
              want to continue their careers while pursuing higher education.
              Unlike a traditional classroom-based MBA, online programmes
              allow learners to access academic resources and attend classes
              remotely, making it possible to study from different locations
              without having to relocate or leave a job.
            </p>

            <p>
              The duration of a standard <strong>Online MBA programme </strong>
              is generally two years, divided into multiple semesters.
              Students study core management subjects during the initial
              stages of the programme and may choose electives or
              specialisations according to the university and programme
              structure. Popular Online MBA specialisations include
              Marketing, Finance, Human Resource Management, Operations,
              International Business and Business Analytics.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}