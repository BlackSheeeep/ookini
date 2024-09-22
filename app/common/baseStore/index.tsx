import { useRecoilCallback } from "recoil";

export class BaseStore {
  public updateState?: (val: Record<string, any>, newVal?: any) => void;
  useInit(this: BaseStore) {
    this.updateState = useRecoilCallback(
      ({ set }) =>
        (atoms: Record<string, any>) => {
          _.toPairs(atoms).forEach(([key, value]) => {
            set(_.get(this, key), value);
          });
        }
    );
  }
}
