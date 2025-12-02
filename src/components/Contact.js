// racfce
const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen px-4 sm:px-6 pt-6">
      <h1 className="font-bold text-3xl sm:text-4xl text-gray-800 mb-10 text-center">
        Contact Us
      </h1>

      <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 sm:p-8 border-3 border-yellow-100">
        <form className="flex flex-col">
          <input
            type="text"
            className="border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            placeholder="Your Name"
          />
          <textarea
            className="border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
            placeholder="Your Message"
            rows={5}
          ></textarea>

          <button
            type="submit"
            className="bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
