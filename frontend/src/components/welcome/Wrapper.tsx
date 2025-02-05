type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className="h-full rounded-[30px] flex w-full flex-row">{children}</div>
  );
};

export default Wrapper;
