import { Info } from "lucide-react";

const ErrorMessage = () => {
  return (
    <section className="flex justify-center items-center flex-col mt-6 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
      <span className="flex gap-2 font-medium">
        <Info /> Something went wrong
      </span>

      <p className="my-3">Please refresh the page</p>

      <button
        onClick={() => window.location.reload()}
        type="button"
        className=" text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
      >
        Refresh
      </button>
    </section>
  );
};

export default ErrorMessage;
