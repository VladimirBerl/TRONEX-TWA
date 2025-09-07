import { DepositForm, WithdrawForm } from "@/features";

interface FormDisplayProps {
  selectForm: string;
}

export const FormDisplay = ({ selectForm }: FormDisplayProps) => {
  return selectForm === "deposit" ? <DepositForm /> : <WithdrawForm />;
};
