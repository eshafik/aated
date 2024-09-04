import { CardProps } from "antd";
import { PropsWithChildren } from "react";
import { StyledCard } from "../../components/StyleCard";

const Scaffold = ({ children, ...props }: PropsWithChildren & CardProps) => {
  return (
    <StyledCard
      {...props}
      className="container h-[calc(100vh-80px)] max-w-[1800px] flex flex-col overflow-auto mt-3"
    >
      {children}
    </StyledCard>
  );
};

export default Scaffold;
