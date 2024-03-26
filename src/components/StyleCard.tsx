import { Card } from "antd";
import styled from "styled-components";

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  .ant-card-body {
    overflow-y: auto;
    flex: 1 1 0%;
  }
`;
