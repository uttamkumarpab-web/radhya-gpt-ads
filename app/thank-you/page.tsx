import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-[#f1f1f1] px-4 font-sans">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-lg dark:bg-purple-100">
        <h1 className="text-2xl font-bold text-[#3c087e]">Thank You!</h1>
        <p className="mt-3 text-sm text-[#3c087e]">
          Your request has been received. Our admissions team will get in touch
          with you shortly.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded bg-[#eea727] px-4 py-2 text-sm font-medium text-white transition duration-300 hover:opacity-90"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}