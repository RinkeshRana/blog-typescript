function Hero() {
  return (
    <div className="flex justify-center items-center min-h-[800px] text-center ">
      <div>
        <div className="text-4xl md:text-6xl lg:text-9xl tracking-tight">
          Be Part of a<div className="font-bold">better internet</div>
        </div>
        <div className="mt-12 md:mt-5 text-xl">
          <div className="font-light tracking-tight">
            Read. Write. Deepen your understanding.
          </div>
          <div className="mt-5 md:mt-3 font-semibold tracking-tight">
            Last chance! 3 days left to get 20% off membership.
          </div>
        </div>
        <div className="mt-12 ">
          <button className="px-8 py-2 bg-black text-white rounded-full tracking-tight">
            Become a member
          </button>
        </div>
      </div>
    </div>
  );
}
export default Hero;
