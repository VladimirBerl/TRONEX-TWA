import { Page, Form } from "@/shared/ui";
import { WithdrawForm, withdrawSchema, WithdrawFormValues } from "@/features";
import { TransactionFooter } from "@/widgets";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent } from "react";

export const WithdrawPage = () => {
  const { t } = useTranslation();

  const form = useForm<WithdrawFormValues>({
    defaultValues: {
      withdrawAmount: "",
      walletAddress: "",
      network: "",
    },
    resolver: zodResolver(withdrawSchema),
  });

  const handleWithdrawTransaction = (data: WithdrawFormValues) => {
    console.log(data);
  };

  return (
    <Page className="flex flex-col h-[100vh]">
      <h1 className="text-title leading-none text-center mb-[26px]">{t("withdraw.title")}</h1>

      <Form {...form}>
        <form
          className="flex flex-col h-full"
          onSubmit={(event: FormEvent<HTMLFormElement>): void => {
            event.preventDefault();
            void form.handleSubmit(handleWithdrawTransaction)(event);
          }}
        >
          <WithdrawForm form={form} />

          <div className="flex items-end h-full w-full pb-8 pt-2">
            <TransactionFooter
              btnText={t("withdraw.btn_text")}
              buttonValue={form.watch("withdrawAmount") || "0"}
            />
          </div>
        </form>
      </Form>
    </Page>
  );
};
