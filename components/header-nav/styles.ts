import { css } from "@emotion/react";

export const container = css`
  background: #0000ff9c;
  padding: 20px;

  ul {
    display: flex;
    justify-content: center;
    gap: 64px;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin: 0;
    }

    li,
    a {
      text-decoration: none;
      color: #ffffffbf;
      font-size: 16px;
      cursor: pointer;
    }
  }
`;
