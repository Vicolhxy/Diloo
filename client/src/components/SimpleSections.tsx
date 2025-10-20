export default function SimpleSections() {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full max-w-[1920px] h-[113px] flex justify-center items-center gap-[30px] px-[100px] py-5 overflow-hidden">
        <h2 className="font-sans font-bold text-[60px] leading-normal text-black" data-testid="text-how-it-works">
          How It Works
        </h2>
      </div>
      
      <div className="w-full max-w-[1920px] h-[113px] flex justify-center items-center gap-[30px] px-[100px] py-5 overflow-hidden">
        <h2 className="font-sans font-bold text-[60px] leading-normal text-black" data-testid="text-why-choose-us">
          Why Choose Us
        </h2>
      </div>
      
      <div className="w-full max-w-[1920px] h-[113px] flex justify-center items-center gap-[30px] px-[100px] py-5 overflow-hidden">
        <h2 className="font-sans font-bold text-[60px] leading-normal text-black" data-testid="text-what-users-say">
          What Our Users Say
        </h2>
      </div>
    </div>
  );
}
