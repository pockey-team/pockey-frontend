import { cn } from "@/lib/utils";

interface Props {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  className?: string;
  isCapturing?: boolean;
  showBackground?: boolean;
}

export const ContentSection = ({
  title,
  subTitle = "",
  children = "",
  className = "",
  isCapturing = false,
  showBackground = false,
}: Props) => {
  return (
    <section
      className={cn(
        "my-24px rounded-3xl",
        isCapturing
          ? "bg-[#E5E7EB] p-24px"
          : showBackground
            ? "bg-gray-800 p-8px"
            : undefined,
        className,
      )}
    >
      <h2
        className={cn(
          "mb-12px text-subtitle-18-bold",
          isCapturing ? "text-gray-900" : "text-gray-100",
        )}
      >
        {title}
      </h2>
      {subTitle && (
        <p
          className={cn(
            "mb-12px text-body-16-regular",
            isCapturing ? "text-[#407CFF]" : "text-primary-500",
          )}
        >
          {subTitle}
        </p>
      )}
      <div>{children}</div>
    </section>
  );
};
