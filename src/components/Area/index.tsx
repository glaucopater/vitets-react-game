import "./Area.css";
export const Area = ({
  handleMouseClick,
  children,
}: {
  handleMouseClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="area" onClick={handleMouseClick}>
      {children}
    </div>
  );
};
