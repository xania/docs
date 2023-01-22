import { JsxElement, jsxFactory, render, TemplateNodeType } from "@xania/view";
import classes from "../layout.module.scss";
import { Bash, Img, Javascript } from "../components";
import { Outline } from "../outline";
import { Search } from "../search";
import benchmarkImg from "./assets/benchmark-results.png";
import { Diamond } from "./demos/diamond";
import logoUrl from "./assets/logo.webp";

const jsx = jsxFactory({ classes });

render(<App />, document.getElementById("app"));

export function App() {
  const main = <Main />;
  return (
    <div class="app">
      <div class="app__aside">
        <div class="logo" style={`background-image: url(${logoUrl})`} />
        <h1>Super Docu</h1>
        <Search />
        <Outline>
          <Main />
        </Outline>
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
            To get you started you only need to install the @xania/state package
          </p>
        </div>
        <div class="section__code">
          <Bash>npm install @xania/view</Bash>
        </div>
      </div>
      <div class="section">
        <div class="section__content">
          <h1 id={"introduction"}>Introduction</h1>
          <p>
            @xania/state is intended to be complementary to RxJS and is
            especially an alternative to BehaviorSubject and it's main goal to
            provide reactivity for the View library. RxJS is on the other hand
            better suited for handling events coming from view, e.g. for
            debounce, async, etc...
          </p>
          <p>
            Reactivity in @xania/state is in first place about setting up the
            logic of how the data flows, independent from whether or not the
            actual data is available. Secondly, when data is available or is
            changed then the states should be synchronised according to this
            logic.
          </p>
          <p>
            We also allow observers to subscribe to the individual state values.
            These observer are immediately notified on subscription (when state
            current value is not undefined) and on changes of the state values.
            So when observers are being called we can be sure the state is
            changed.
          </p>
        </div>
        <div class="section__code">
          <Javascript lines={[5, 11]}>
            {`
// 1. import
import { State } from "@xania/state";

// 2. create
const count = new State(1);

// 3. subscribe
const subscription = count.subcribe({
  next(value: number) {
    // 4. react on distinct values 
    console.log(value);
  },
});

// 5. unsubscribe
subscription.unsubscribe();        
            `}
          </Javascript>
        </div>
      </div>
      <div class="section">
        <div class="section__content">
          <h1 id={"core-features"}>Core features</h1>
          <ul>
            <li>monadic state (map, bind)</li>
            <li>topological sorting</li>
            <li>asynchronuous data (in progress)</li>
            <li>scheduling (in progress)</li>
            <li>batching (in progress)</li>
          </ul>
        </div>
        <div class="section__code"></div>
      </div>
      <div class="section">
        <div class="section__content">
          <h1 id={"fine-grained-state"}>Fine-grained state</h1>
          <h2>Benchmark results</h2>
          <p>
            <Img height={200} src={benchmarkImg} />
          </p>
        </div>
        <div class="section__code"></div>
      </div>
      <div class="section">
        <div class="section__content">
          <h1 id={"state"}>State</h1>
        </div>
        <div class="section__code"></div>
      </div>
      <div class="section">
        <div class="section__content">
          <h2 id={"create-state"}>Create new state object</h2>
        </div>
        <div class="section__code">
          <Javascript lines={[4]}>
            {`
import { State } from "@xania/state";

function App() {
  const count = new State<number>();
}`}
          </Javascript>
        </div>
      </div>
      <div class="section">
        <div class="section__content">
          <h2 id={"combine-latest"}>Combine latest</h2>
        </div>
        <div class="section__code">
          <Javascript lines={[6]}>
            {`
import { State, combineLatest } from "@xania/state";

function App() {
  const x = new State<number>(1);
  const y = new State<number>(2);
  const sum = combineLatest([x, y]).map(([x, y]) => x + y)
}
            `}
          </Javascript>
        </div>
      </div>
      <div class="section">
        <div class="section__content">
          <h1 id={"state-operators"}>State operators</h1>
          <p>prop, map, bind</p>
        </div>
        <div class="section__code"></div>
      </div>
      <div class="section">
        <div class="section__content">
          <h2 id={"property-oprator"}>Property operator</h2>
          <p>prop, map, bind</p>
        </div>
        <div class="section__code"></div>
      </div>
      <div class="section">
        <div class="section__content">
          <h2 id={"create-state"}>Map operator</h2>
          <p>prop, map, bind</p>
        </div>
        <div class="section__code"></div>
      </div>
      <div class="section">
        <div class="section__content">
          <h1 id={"state-mutations"}>State mutations</h1>
          <p>
            All types of state values allow for update. @xania/state guarantees
            that when a state value is updated then the dependents are
            synchronised in most efficient and performant manner. But it does
            not guarantee that all these mutation on state s will be
            synchronised with dependencies of s. In case s is derived from a
            property of a parent state then synchronisation is obvious, but when
            mapped by a function then after update of s we rely on events
            handling by user to propagate the value back to it's
            parent/dependencies. There are cases where this behavior is
            desirable for example when data in s first need to be verified
            manually send to backend and only after succesful save we propagate
            the values to the dependencies.
          </p>
        </div>
        <div class="section__code"></div>
      </div>
      <div class="section">
        <div class="section__content">
          <h2 id={"special-case-of-undefined"}>Special case of undefined</h2>
          <p>
            A new State object when no value is provided then State as not
            initialized in which case the observers will not be notified untill
            non undefined value is provided. Also updates with undefined value
            are not processed and the previous value is untouched. This also
            applies for derived state, e.g. when a state value is mapped to
            undefined.
          </p>
        </div>
        <div class="section__code"></div>
      </div>
      <div class="section">
        <div class="section__content">
          <h1 id={"interop"}>Interop</h1>
          <p></p>
        </div>
        <div class="section__code"></div>
      </div>
      <div class="section">
        <div class="section__content">
          <h2 id={"create-state"}>from Observable</h2>
          <p></p>
        </div>
        <div class="section__code">
          <Javascript lines={[4]}>
            {`
import { from } from "@xania/state";
import { timer } from "rxjs";

const state = from(timer(0, 1000));
            `}
          </Javascript>
        </div>
      </div>
      <div class="section">
        <div class="section__content">
          <h2 id={"create-state"}>from Promise</h2>
          <p></p>
        </div>
        <div class="section__code">
          <Javascript lines={[3]}>
            {`
import { from } from "@xania/state";

const state = from(Promise.resolve(1));
            `}
          </Javascript>
        </div>
      </div>
      <div class="section">
        <div class="section__content">
          <h2 id={"from-async-iterator"}>from AsyncTterator</h2>
          <p></p>
        </div>
        <div class="section__code">
          <Javascript lines={[3]}>
            {`
import { from } from "@xania/state";

const state = from([1, 2, 3].values());
            `}
          </Javascript>
        </div>
      </div>
      <div class="section">
        <div class="section__content">
          <h2 id={"from-event"}>from Event</h2>
          <p></p>
        </div>
        <div class="section__code">
          <Javascript lines={[3]}>
            {`
import { from } from "@xania/state";

const state = from([1, 2, 3].values());
            `}
          </Javascript>
        </div>
      </div>
      <div class="section">
        <div class="section__content">
          <h1 id={"create-state"}>Diamond problem</h1>
          {/* <h2>
            <a href="https://stackblitz.com/edit/vitejs-vite-cxno2b">
              Live demo
            </a>
          </h2> */}
          <Diamond />
        </div>
        <div class="section__code"></div>
      </div>
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
