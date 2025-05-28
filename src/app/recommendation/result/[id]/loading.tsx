import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0px z-50 flex items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center gap-16px">
        <div className="animate-bounce">
          <Image
            src="/static/images/symbol.svg"
            alt="logo"
            width={45}
            height={45}
            priority
          />
        </div>
        <div className="mt-4 text-gray-100 text-subtitle-18-medium">
          상품을 불러오는 중입니다.
        </div>
      </div>
    </div>
  );
}
