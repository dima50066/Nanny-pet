type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className="h-full rounded-[30px] flex flex-col md:flex-row w-full max-w-none">
      {children}
    </div>
  );
};

export default Wrapper;
