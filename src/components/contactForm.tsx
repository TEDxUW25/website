export default function ContactForm() {
  return (
    <form className="text-black w-4/5">
      <div className="flex flex-wrap my-7 md:my-9 xl:my-11 justify-between">
        {/* Name Box */}
        <div className=" w-[45%] flex items-center h-12 md:h-14 xl:h-16">
          <input
            name="name"
            className="text-sm rounded-xl md:text-lg xl:text-xl outline-none p-3 md:p-5 w-full"
            type="text"
            placeholder="Your Name"
            required
          />
        </div>
        {/* Email Box */}
        <div className="w-[45%] flex items-center h-12 md:h-14 xl:h-16">
          <input
            name="email"
            className="text-sm rounded-xl md:text-lg xl:text-xl outline-none p-3 md:p-5 w-full"
            type="text"
            placeholder="Email"
            required
          />
        </div>
      </div>
      {/* Message Box */}
      <div className="">
        <textarea
          name="message"
          className="w-full rounded-xl text-sm md:text-lg xl:text-xl h-48 md:h-60 xl:h-72 resize-none p-3 md:p-5 outline-none overflow-y-auto"
          placeholder="Message"
          required
        ></textarea>
      </div>
      {/* Submit Button */}
      <button className="float-right cursor-pointer text-white text-sm md:text-lg xl:text-xl my-7 rounded-lg border-2 px-4 py-2 hover:bg-black hover:border-[var(--button-transition)] transition ease-in-out">
        Submit
      </button>
    </form>
  );
}
