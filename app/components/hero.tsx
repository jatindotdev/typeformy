import { Input } from "./ui/input";

export default function Hero() {
  return (
    <div className="grow flex flex-col items-center justify-between">
      <main className="grow flex flex-col gap-3 items-center justify-center w-full snap-mandatorysnap-y ">
        <div className="flex flex-col align-middle justify-center w-[50rem] pb-40 gap-3 h-screen snap-center border border-white">
          <h1 className="text-3xl">Enter Your Name</h1>
          <Input
            type="text"
            className="text-xl placeholder:text-xl h-16"
            placeholder="Your Beautifull Name"
          />
        </div>
        <div className="flex flex-col align-middle justify-center w-[50rem] pb-40 gap-3 h-screen snap-center border border-white">
          <h1 className="text-3xl">Enter Your Name</h1>
          <Input
            type="text"
            className="text-xl placeholder:text-xl h-16"
            placeholder="Your Beautifull Name"
          />
        </div>
        <div className="flex flex-col align-middle justify-center w-[50rem] pb-40 gap-3 h-screen snap-center border border-white">
          <h1 className="text-3xl">Enter Your Name</h1>
          <Input
            type="text"
            className="text-xl placeholder:text-xl h-16"
            placeholder="Your Beautifull Name"
          />
        </div>
        <div className="flex flex-col align-middle justify-center w-[50rem] pb-40 gap-3 h-screen snap-center border border-white">
          <h1 className="text-3xl">Enter Your Name</h1>
          <Input
            type="text"
            className="text-xl placeholder:text-xl h-16"
            placeholder="Your Beautifull Name"
          />
        </div>
      </main>
      {/* <footer className="p-10">Update it later</footer> */}
    </div>
  );
}
