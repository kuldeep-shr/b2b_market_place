import { css } from "@emotion/react";

export const container = css`
  padding: 24px;
`;

export const productContainer = css`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const productHead = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin-bottom: 0;
  }

  button {
    padding: 16px 16px;
    color: #fff;
    background: #0000ff9c;
    border: none;
    margin-top: 16px;
    cursor: pointer;
  }
`;
