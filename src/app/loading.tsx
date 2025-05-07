import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Image
        className="animate-bounce"
        src="/logo.svg"
        alt="logo"
        width={100}
        height={100}
      />
    </div>
  );
};

export default Loading;
