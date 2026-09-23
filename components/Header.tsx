import Image from "next/image";
import OpenFormButton from "./OpenFormButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.jpg"
            alt="REA Logo"
            width={160}
            height={40}
            priority
            className="h-6 w-auto md:h-10"
          />
        </div>
        <OpenFormButton
          id="cta-header-apply-now"
          label="Apply Now"
          className="rounded bg-[#3c087e] px-4 py-2 text-sm font-semibold text-white shadow transition-colors duration-300 hover:bg-[#eea727]"
        >
          Apply Now
        </OpenFormButton>
      </div>
    </header>
  );
}