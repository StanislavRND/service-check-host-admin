import { forwardRef } from "react";

export const HiddenInput = forwardRef<HTMLInputElement>((props, ref) => {
  return <input ref={ref} type="hidden" {...props} />;
});

HiddenInput.displayName = "HiddenInput";
