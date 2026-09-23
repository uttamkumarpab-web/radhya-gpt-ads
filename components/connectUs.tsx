import Link from "next/link";
import OpenFormButton from "./OpenFormButton";

export default function ConnectUs() {
  return (
    <section className="w-full bg-[#3C087E] py-6 md:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[20px] bg-[#F9F7FC]">

          {/* Main Banner */}
          <div className="relative min-h-[430px] md:min-h-[260px]">

            {/* Image */}
            <div className="absolute inset-x-0 bottom-0 h-[180px] md:inset-y-0 md:right-0 md:left-auto md:h-full md:w-[52%]">
              <img
                src="/images/graduates.webp"
                alt="Students discussing Online MBA specializations"
                className="h-full w-full object-cover"
              />

              {/* Full Image Theme Overlay */}
              <div className="absolute inset-0 bg-[#3C087E]/70"></div>

              {/* Soft transition between content and image */}
              <div className="absolute inset-y-0 left-0 hidden w-[35%] bg-gradient-to-r from-[#F9F7FC] to-transparent md:block"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex min-h-[430px] flex-col justify-start px-6 pt-8 py-8 md:min-h-[260px] md:w-[62%] md:justify-center md:px-10 lg:px-12">

              {/* Heading */}
              <h2 className="text-[24px] leading-tight font-bold text-[#3C087E] md:text-[30px] lg:text-[32px]">
                Not sure which specialization to choose?
                <br className="hidden md:block" />
                We are{" "}
                <span className="text-[#EEA727]">
                  here to help.
                </span>
              </h2>

              {/* Description */}
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#52647B] md:text-base">
                Our expert counsellors will guide you to choose the right
                specialization based on your career goals and interests.
              </p>

{/* CTA */}
              <div className="mt-6 flex w-full justify-center md:absolute md:right-[-55%] md:top-1/2 md:mt-0 md:w-auto md:justify-start md:-translate-y-1/2">
                <OpenFormButton
                  id="cta-connect-personalized-guidance"
                  label="Get Personalized Guidance"
                  className="flex w-full max-w-sm items-center justify-center gap-3 rounded-xl bg-[#EEA727] px-5 py-3.5 text-sm font-bold text-[#3C087E] shadow-[0_10px_24px_#EEA72733] transition-all duration-300 hover:scale-[1.03] hover:bg-[#F2B43B] md:max-w-none md:w-auto md:px-6 md:text-base"
                >
                  Get Personalized Guidance

                  <span className="text-xl leading-none">
                    →
                  </span>
                </OpenFormButton>
              </div>

            </div>
          </div>
        </div>
         {/* --- Bottom Bar --- */}
        <div className="h-px w-full bg-gray-600 mt-6"></div>
        <div className="items-center justify-between text-[11px] md:text-xs text-white mt-3">
          <p>
            <span className="font-bold text-[#EEA727]">Disclaimer: </span>We act as an education information providing platform and as an independent education counselling service, if requested. We are not a university and do not award degrees. Programs, fees, approvals and eligibility are set by the respective universities and can change; verify details with the university and on the official UGC-DEB website. Career outcomes and salary changes are not guaranteed.
          </p>
        </div>
        <div className=" flex flex-col md:flex-row items-center justify-between text-[11px] md:text-xs text-white mt-3">
          <p className="text-center md:text-left">
            © 2026 Radhya Education Academy Pvt. Ltd.
          </p>
          <div className="flex space-x-2 mt-2 md:mt-0">
            <Link
              href="https://radhyaeducationacademy.com/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#EEA727]"
            >
              Privacy Policy {""}||
            </Link>
            <Link
              href="https://radhyaeducationacademy.com/disclaimer/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#EEA727]"
            >
              Disclaimer {""}||
            </Link>
            <Link
              href="https://radhyaeducationacademy.com/terms-and-conditions/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#EEA727]"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}