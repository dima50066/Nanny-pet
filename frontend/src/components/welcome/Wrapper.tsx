type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className="h-full rounded-[30px] flex w-[1376px] flex-row p-8">
      {children}
    </div>
  );
};

export default Wrapper;
