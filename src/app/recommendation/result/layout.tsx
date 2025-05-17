const ResultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-gradient-recommendation">
      <section>{children}</section>
    </main>
  );
};

export default ResultLayout;
