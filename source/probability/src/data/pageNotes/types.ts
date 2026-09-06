export interface PageNote {
  ref: string;    // what on the page: "Definition 3.1", "Example 2.9", "Remark", …
  what: string;   // plain-language explanation, $tex$ allowed
  tex?: string;   // the item's key formula, displayed
}
