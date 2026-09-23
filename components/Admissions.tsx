import {
  UserPlus,
  FileText,
  Upload,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: 1,
    icon: UserPlus,
    title: "Register",
    description: "Fill the inquiry form with your basic details.",
  },
  {
    number: 2,
    icon: FileText,
    title: "Fill Application",
    description: "Complete your application and academic details.",
  },
  {
    number: 3,
    icon: Upload,
    title: "Upload Documents",
    description: "Upload the required academic documents.",
  },
  {
    number: 4,
    icon: BadgeCheck,
    title: "Get Admission",
    description: "Receive confirmation & start your MBA journey.",
  },
];

export default function AdmissionProcessSection() {
  return (
    <section className="py-12 md:py-16 bg-[#fffdf8] ">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-2xl md:text-[30px] font-bold text-[#3c087E] text-center mb-12 lg:mb-16">
        Simple Admission Process
      </h2>

        {/* Steps */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative">

                {/* Card */}
                <div className="relative bg-[#f8f8f8] border border-orange-100 rounded-2xl p-2 text-center shadow-sm hover:shadow-md transition">
                  {/* Number Badge */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#3c087e] text-white font-bold text-lg flex items-center justify-center shadow-md">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mt-6 mb-4 flex justify-center">
                    <Icon className="w-12 h-12 text-[#eea727]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#3c087e] mb-1">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}