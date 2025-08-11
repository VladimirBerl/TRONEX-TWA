import { RootState } from "@/app/store/store.ts";

export const selectReferralsInfo = (state: RootState) => state.user.referrals;
