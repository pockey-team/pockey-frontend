export default function RecommendationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-dvh w-full overflow-y-auto px-8 py-12">{children}</div>
  );
}
