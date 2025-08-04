interface StatisticItemProps {
  label: string;
  value: string;
}

export const StatisticItem = ({ label, value }: StatisticItemProps) => {
  return (
    <div className="flex justify-between">
      <dt className="pr-2">{label}</dt>
      <dd className="text-link text-end">{value}</dd>
    </div>
  );
};
