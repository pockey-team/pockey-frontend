const WishlistLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-dvh w-full flex-col bg-gray-800 text-gray-100">
      {children}
    </div>
  );
};

export default WishlistLayout;
