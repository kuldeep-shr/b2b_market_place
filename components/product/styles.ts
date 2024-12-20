import { css, SerializedStyles } from "@emotion/react";
import { ProductStatus } from "./types";

export const container = css`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const product = css`
  border-radius: 4px;
  border: 1px solid #c0c0c0;
  width: 280px;
  height: auto;
  cursor: pointer;
`;

export const head = css`
  position: relative;
  height: 280px;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    height: 280px;
    width: 280px;
  }

  h6 {
    position: absolute;
    bottom: 12px;
    left: 12px;
    font-size: 16px !important;
    font-family: 500;
    margin-bottom: 0;
    padding: 4px;
    background: #ffffffba;
  }
`;

export const body = css`
  padding: 0 12px;

  p {
    font-size: 14px;
    line-height: 18px;
  }
`;

export const status = ({
  status,
}: {
  status: ProductStatus;
}): SerializedStyles => css`
  padding: 12px 16px;
  color: #fff;
  text-align: center;
  text-transform: capitalize;
  font-size: 16px;
  background: ${status === "available" ? "green" : "grey"};
  margin-bottom: 16px;

  ${status === "available" &&
  css`
    border: 2px #24c890c9 solid;
    color: #24c890c9;
    background: none;
  `}

  ${status === "sold" &&
  css`
    padding: 14px 18px;
    cursor: not-allowed;
    background: #80808085;
  `}
`;
