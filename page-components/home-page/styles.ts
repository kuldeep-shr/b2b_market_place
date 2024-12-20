import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 100%;
`;

export const heading = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  padding: 24px;
  text-align: center;

  h1 {
    font-size: 62px;
    font-weight: 500;
    margin-bottom: 0;
    max-width: 700px;
  }

  p {
    font-size: 16px;
    margin-bottom: 0;
  }
`;

export const products = css`
  padding: 32px 32px;

  h6 {
    font-size: 24px;
    margin-bottom: 16px;
  }
`;

export const excent = css`
  color: orange;
`;

export const button = css`
  padding: 12px 24px;
  background: #0000ff9c;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 18px;
  margin-top: 16px;
`;
