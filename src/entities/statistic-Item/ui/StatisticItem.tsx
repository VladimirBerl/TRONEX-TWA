interface StatisticItemProps {
  label: string,
  value: string,
}

export const StatisticItem = ({ label, value }: StatisticItemProps) => {
  return (
    <div className="flex justify-between">
      <dt>{ label }</dt>
      <dd className="text-[#18A7FB]">{ value }</dd>
    </div>
  );
};
