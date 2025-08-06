declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "redux-persist/lib/storage" {
  import { WebStorage } from "redux-persist";
  const storage: WebStorage;
  export default storage;
}
