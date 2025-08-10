import { Page, Form } from "@/shared/ui";
import { TransactionFooter } from "@/widgets";
import { DepositForm, DepositFormValues, depositSchema, deposit } from "@/features";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch.ts";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";

export const DepositPage = () => {
  const { t } = useTranslation();
  const [tonConnectUI] = useTonConnectUI();
  const address: string = useTonAddress();
  const { id_tg } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<DepositFormValues>({
    defaultValues: {
      depositAmount: "",
    },
    resolver: zodResolver(depositSchema),
  });

  const handleDepositTransaction = async (data: DepositFormValues): Promise<void> => {
    if (!address) {
      alert("Connect wallet first");
      return;
    }

    const amountTON = parseFloat(data.depositAmount);
    if (isNaN(amountTON) || amountTON <= 0) {
      alert("Invalid deposit amount");
      return;
    }

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [
        {
          // TODO Сюда надо вставить адрес кошелька юзера, получаемый с бекенда
          address: "0QCARUdldriJELKSQRI4zkaAJtQgi7tD8A9fK-GwT5vASPkt", // твой депозитный адрес
          amount: (amountTON * 1_000_000_000).toString(), // переводим TON в нанотоны
        },
      ],
    };

    try {
      await tonConnectUI.sendTransaction(transaction);
      alert("Transaction sent! Please confirm in your wallet.");
    } catch (e) {
      console.error(e);
      alert("Failed to send transaction");
      return;
    }

    const amount: string = data.depositAmount.toString();
    if (id_tg != null) void dispatch(deposit({ id_tg, amount }));
    form.reset({ depositAmount: "" });
    void navigate("/deposit", { replace: true });
  };

  return (
    <Page className="flex flex-col h-[100vh]">
      <h1 className="text-title leading-none text-center mb-[26px]">{t("deposit.title")}</h1>

      <Form {...form}>
        <form
          className="flex flex-col h-full"
          onSubmit={(event: FormEvent<HTMLFormElement>): void => {
            event.preventDefault();
            void form.handleSubmit(handleDepositTransaction)(event);
          }}
        >
          <DepositForm form={form} />

          <div className="flex items-end h-full w-full pb-8 pt-2">
            <TransactionFooter
              btnText={t("deposit.btn_text")}
              buttonValue={form.watch("depositAmount") || "0"}
            />
          </div>
        </form>
      </Form>
    </Page>
  );
};
