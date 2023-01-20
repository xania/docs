import { jsxFactory } from "@xania/view";
import prettier from "prettier";
import parserTypescript from "prettier/parser-typescript";

import Prism from "prismjs";

import classes from "./css.module.scss";
const jsx = jsxFactory({ classes });

interface MarkdownProps {
  children: string;
  lines: number[];
}

export function Code(props: MarkdownProps) {
  try {
    const formatted = prettier.format(props.children[0], {
      parser: "typescript",
      plugins: [parserTypescript],
    });

    const html = Prism.highlight(formatted, Prism.languages.js, "javascript");

    const lines = html
      .split("\n")
      .map(
        (x, i) =>
          `<span class="${classes["line"]} ${
            props.lines.includes(i + 1) ? classes["line--highlited"] : null
          }"><span class="${classes["line-number"]}">${i + 1}</span>${x}</span>`
      )
      .join("\n");

    return (
      <pre class="preformatted">
        <code innerHTML={lines}></code>
      </pre>
    );
  } catch (err) {
    return <pre>{err.message}</pre>;
  }
}
