import { cn } from "@/lib/utils";

interface Props {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const ContentSection = ({
  title,
  subTitle = "",
  children = "",
  className = "",
}: Props) => {
  return (
    <section className={cn("my-40px", className)}>
      <h2 className="mb-12px text-gray-100 text-subtitle-18-bold">{title}</h2>
      {subTitle && (
        <p className="mb-12px text-body-16-regular text-primary-500">
          {subTitle}
        </p>
      )}
      <div>{children}</div>
    </section>
  );
};
