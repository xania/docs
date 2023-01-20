import { jsxFactory } from "@xania/view";
import classes from "./css.module.scss";

const jsx = jsxFactory({ classes });

export function Search() {
  return (
    <div class="search">
      <input class="input" type="text" placeholder={"Search..."}></input>
    </div>
  );
}
