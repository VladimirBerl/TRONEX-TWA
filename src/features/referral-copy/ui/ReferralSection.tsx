import { Button, Input } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/shared/hooks/useAppDispatch.ts";
import { RootState } from "@/app/store/store.ts";
import { useState, useRef, MutableRefObject } from "react";

export const ReferralSection = () => {
  const { t } = useTranslation();
  const [textButton, setTextButton] = useState<string>("invite.copy_link");
  const isCopyRef: MutableRefObject<boolean> = useRef<boolean>(false);

  const referrals = useAppSelector((state: RootState) => state.user.referrals);
  const { invite_link } = referrals || {};

  const handleCopyInviteLink = async (): Promise<void> => {
    if (!invite_link) return;

    try {
      await navigator.clipboard.writeText(invite_link);
      setTextButton("Скопировано!");

      if (isCopyRef.current) return;
      isCopyRef.current = true;

      setTimeout((): void => {
        isCopyRef.current = false;
        setTextButton("invite.copy_link");
      }, 2000);
    } catch (err) {
      console.error("Не удалось скопировать ссылку:", err);
    }
  };

  return (
    <section className="flex flex-col items-center w-full gap-2.5">
      <h2 className="text-heading leading-none">{t("invite.referral_link")}</h2>

      <Input
        className="min-w-[120px] w-full bg-[#1b1b27] border border-[#2a2f40] text-[#5d8cf0] text-center focus:outline-none focus:border-[#5d8cf0]/40 focus:ring-1 focus:ring-[#5d8cf0]/20 transition-all duration-200"
        value={invite_link || ""}
        readOnly
      />

      <Button
        variant="action"
        className="w-full"
        onClick={(): undefined => void handleCopyInviteLink()}
      >
        {t(`${textButton}`)}
      </Button>
    </section>
  );
};
