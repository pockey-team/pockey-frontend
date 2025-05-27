import { cn } from "@/lib/utils";

interface Props {
  title?: string;
  subTitle?: string;
  children: React.ReactNode;
  className?: string;
  isCapturing?: boolean;
  showBackground?: boolean;
  hideOnCapture?: boolean;
  isSharePage?: boolean;
}

export const ContentSection = ({
  title = "",
  subTitle = "",
  children = "",
  className = "",
  isCapturing = false,
  showBackground = false,
  hideOnCapture = false,
  isSharePage = false,
}: Props) => {
  return (
    <section
      className={cn(
        "rounded-3xl py-16px",
        hideOnCapture ? "hidden" : "block",
        isSharePage ? "my-8px" : "my-24px",
        {
          "my-0px bg-[#E5E7EB]": isCapturing,
          "!my-0px": !showBackground,
          [`p-16px ${isSharePage ? "bg-[#E5E7EBA1]" : "bg-gray-800"}`]:
            showBackground && !isCapturing,
        },
        className,
      )}
    >
      <h2
        className={cn(
          "mb-12px text-body-14-semibold",
          isCapturing || isSharePage ? "text-gray-700" : "text-gray-100",
        )}
      >
        {title}
      </h2>
      {subTitle && (
        <p
          className={cn(
            "mb-12px text-body-16-bold",
            isCapturing || isSharePage ? "text-[#407CFF]" : "text-primary-500",
          )}
        >
          {subTitle}
        </p>
      )}
      <div>{children}</div>
    </section>
  );
};
