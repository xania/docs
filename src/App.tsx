import { JsxElement, jsxFactory, TemplateNodeType } from "@xania/view";
import classes from "./layout.module.scss";
import { Code } from "./code";
import { Outline } from "./outline";
import { Search } from "./search";

const jsx = jsxFactory({ classes });

export default function App() {
  const main = <Main />;
  return (
    <div class="app">
      <div class="app__aside">
        <div class="logo" />
        <h1>Super Docu</h1>
        <Search />
        <Outline>{main}</Outline>
        <footer>
          <a class="github" href="https://github.com/xania/slate">
            <span>Github</span>
          </a>
        </footer>
      </div>
      {main}
    </div>
  );
}

function Main() {
  return (
    <div class="app__main">
      <div class="section">
        <div class="section__content">
          <h1 id={"getting-started"}>Getting started</h1>
        </div>
        <div class="section__code"></div>
      </div>
      <div class="section">
        <div class="section__content">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </p>
        </div>
        <div class="section__code">
          <Code lines={[2, 6, 7]}>
            {`
                function start() {
                  return <div>Hello world { 1 + 2 } <>adfasdf</></div>;
                }
              `}
          </Code>
        </div>
      </div>
      <div class="section">
        <div class="section__content">
          <h1 id={"introduction"}>Introduction</h1>
          <p>hello</p>
        </div>
        <div class="section__code">
          <Code lines={[2, 3, 4]}>
            {`
            class A {
              constructor() {
                console.log("Hello World!");
              }
            }            
            `}
          </Code>
        </div>
      </div>
      {Array.from({ length: 10 }).map((_, i) => (
        <div class="section">
          <div class="section__content">
            <h1 id={"header-" + i}>header {i.toString()}</h1>
          </div>
          <div class="section__code"></div>
        </div>
      ))}

      <div class="section section--fill">
        <div class="section__content"></div>
        <div class="section__code"></div>
      </div>
    </div>
  );
}

function outline(template: JSX.Element) {
  const result = [];
  if (template instanceof JsxElement) {
    const stack = [template.templateNode];

    while (stack.length) {
      const curr = stack.pop()!;
      if (curr.name === "h1") {
        const id = curr.attrs["id"];
        if (id) {
          result.push(
            <div>
              <a
                class={[
                  "app__outline__link",
                  result.length === 0 ? "app__outline__link--selected" : null,
                ]}
                href={"#" + id}
              >
                {curr.childNodes}
              </a>
            </div>
          );
        }
      }

      let length = curr.childNodes.length;
      while (length--) {
        const child = curr.childNodes[length];
        if (child.type === TemplateNodeType.Tag) stack.push(child);
      }
    }
  }

  return result;
}
