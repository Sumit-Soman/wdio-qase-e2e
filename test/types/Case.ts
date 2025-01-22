import { TestStep } from "./TestStep";

export type Case = {
  title: string;
  description: string;
  priority: string;
  severity: string;
  type: string;
  layer: string;
  step: TestStep;
  filePath: string;
};
