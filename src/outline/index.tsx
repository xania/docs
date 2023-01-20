import { State } from "@xania/state";
import {
  isTemplateNode,
  JsxElement,
  jsxFactory,
  TagTemplateNode,
  TemplateNodeType,
} from "@xania/view";

import classes from "./css.module.scss";

const jsx = jsxFactory({ classes });

interface Section {
  title: JSX.Children;
  id: string;
}

interface OutlineProps {
  children: JSX.Children;
}
export function Outline(props: OutlineProps) {
  const result: Section[] = [];
  const stack = [props.children];

  while (stack.length) {
    const curr = stack.pop()!;
    if (curr instanceof Array) {
      let length = curr.length;
      while (length--) {
        stack.push(curr[length]);
      }
    } else if (curr instanceof JsxElement) {
      stack.push(curr.templateNode);
    } else if (isTemplateNode(curr) && curr.type === TemplateNodeType.Tag) {
      const tag = curr as TagTemplateNode;
      if (tag.name === "h1") {
        const id = tag.attrs["id"];
        if (id) {
          result.push({
            title: tag.childNodes,
            id,
          });
        }
      }

      let length = tag.childNodes.length;
      while (length--) {
        const child = tag.childNodes[length];
        if (child.type === TemplateNodeType.Tag) stack.push(child);
      }
    }
  }

  const selected = new State(result[0].id);

  return (
    <div class="outline">
      {result.map((section) => (
        <div>
          <a
            click={(_) => selected.set(section.id)}
            class={[
              "link",
              selected.map((x) => (x === section.id ? "link--selected" : null)),
            ]}
            href={"#" + section.id}
          >
            {section.title}
          </a>
        </div>
      ))}
    </div>
  );
}
