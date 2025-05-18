import { cn } from "@/lib/utils";

interface Props {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  className?: string;
  isCapture?: boolean;
}

export const ContentSection = ({
  title,
  subTitle = "",
  children = "",
  className = "",
  isCapture = false,
}: Props) => {
  return (
    <section className={cn("my-40px", className)}>
      <h2
        className={cn(
          "mb-12px text-subtitle-18-bold",
          isCapture ? "text-gray-900" : "text-gray-100",
        )}
      >
        {title}
      </h2>
      {subTitle && (
        <p
          className={cn(
            "mb-12px text-body-16-regular",
            isCapture ? "text-[#407CFF]" : "text-primary-500",
          )}
        >
          {subTitle}
        </p>
      )}
      <div>{children}</div>
    </section>
  );
};
