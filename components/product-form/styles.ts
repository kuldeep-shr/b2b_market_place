import { css, SerializedStyles } from "@emotion/react";

export const container = css`
  padding: 32px;
  text-align: center;

  h1 {
    color: #c0c0c0;
    font-weight: 900 !important;
  }
`;

export const form = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 400px;
  margin: 0 auto;
`;

export const input = ({ error }: { error: boolean }): SerializedStyles => css`
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid #0000ff9c;

  ${error &&
  css`
    border-color: red;
  `}
`;

export const button = css`
  padding: 16px 16px;
  color: #fff;
  background: #0000ff9c;
  border: none;
  margin-top: 16px;
  width: 400px;
  cursor: pointer;
`;
