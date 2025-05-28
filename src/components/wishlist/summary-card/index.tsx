import Image from "next/image";

interface Props {
  receiverName: string;
  count: number;
  images: string[];
}

export const WishListSummaryCard = ({ receiverName, count, images }: Props) => {
  const displayImages = images.slice(0, 4);

  const fallbackItems = Array.from({
    length: Math.max(0, 4 - displayImages.length),
  }).map((_, index) => {
    return {
      id: index + 1,
    };
  });

  return (
    <div className="flex flex-col items-start gap-8px">
      <div className="flex items-center gap-4px">
        <p className="text-body-14-medium text-gray-200">{receiverName}</p>
        <p className="text-caption-12-medium text-gray-400">{count}개</p>
      </div>
      <div className="grid h-[12.75rem] w-[10.75rem] grid-cols-2 grid-rows-2 overflow-hidden rounded-2xl">
        {displayImages.map((image) => (
          <div key={image} className="relative h-full w-full">
            <Image
              src={image}
              alt={receiverName}
              className="object-cover object-center"
              fill
              priority
            />
          </div>
        ))}
        {fallbackItems.map((item) => (
          <div key={item.id} className="bg-gray-700" />
        ))}
      </div>
    </div>
  );
};
