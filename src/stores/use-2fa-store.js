import { create } from "zustand"

export const use2FAStore = create((set) => ({
  secret: "",
  qrCodeUrl: "",
  step: 0,
  recoveryCodes: [],
  update: (updated) => set(updated)
}))
