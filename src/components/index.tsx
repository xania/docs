import { jsxFactory } from "@xania/view";

import Prism from "prismjs";
// import "prismjs/components/prism-diff";
// import "prismjs/plugins/diff-highlight/prism-diff-highlight";

import classes from "./css.module.scss";
const jsx = jsxFactory({ classes });

interface MarkdownProps {
  children: string;
  lines?: number[];
}

export function Img(props: { height: number; src: string }) {
  return (
    <div
      class="image"
      style={`height: ${props.height}px; background-image: url(${props.src})`}
    ></div>
  );
}

export function Bash(props: { children: JSX.Children }) {
  return (
    <div class="bash">
      <span class="bash__content">{props.children}</span>
    </div>
  );
}

export function Javascript(props: MarkdownProps) {
  try {
    const formatted = props.children[0].trim();

    const html: string = parseJsx(
      Prism.highlight(formatted, Prism.languages.js, "javascript")
    );

    const lines = html
      .split("\n")
      .map(
        (x, i) =>
          `<span class="${classes["line"]} ${
            props.lines?.includes(i + 1) ? classes["line--highlited"] : null
          }"><span class="${classes["line-number"]}">${
            i + 1
          }</span><span class="${classes["line__content"]}">${x}</span></span>`
      )
      .join("\n");

    return (
      <>
        <pre class="preformatted">
          <code innerHTML={lines}></code>
          {/* {{
            render(anchor: Anchor) {
          }} */}
        </pre>
      </>
    );
  } catch (err) {
    return <pre>{err.message}</pre>;
  }
}

function parseJsx(input: string): string {
  // The reason why this custom parse code:

  // IF the util is not composable as Prismjs is then I call that a BUG despite that
  // behavior is exactly how it is intented to work by the authors

  // First I had to add custom code to add support for line numbering
  // instead of the buildin buggy non composable feature of Prism
  // But with that then adding jsx support breaks my effort, again.

  let remaingCode = input;
  let resultCode = "";

  const tagRegex =
    /\<span class="token operator"\>&lt;<\/span>(<span class="token operator">\/<\/span>)?(\w*)\<span class=\"token operator\">><\/span>/;

  while (remaingCode) {
    const match = remaingCode.match(tagRegex);

    if (match) {
      const matchIndex = match.index;

      const tag = `<span class="tag">&lt;${match[1] ? "/" : ""}${
        match[2]
      }&gt;</span>`;

      resultCode += remaingCode.slice(0, matchIndex) + tag;
      remaingCode = remaingCode.slice(matchIndex + match[0].length);
    } else {
      return resultCode + remaingCode;
    }
  }

  //      '<span class="token operator snap">&lt;$1&gt;</span>'
  //     );}

  return resultCode;
}

function parseTagContent(input: string) {}
