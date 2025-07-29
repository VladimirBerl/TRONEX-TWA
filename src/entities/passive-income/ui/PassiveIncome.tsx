// TODO Положил в сущности, поскольку это доход, как товар или карточка (в пример привёл)
export const PassiveIncome = () => {
  return (
    <section className="my-[26px]">
      <h2 className="text-heading-light text-center">Passive income</h2>

      <div className="flex gap-2.5 items-center">
        <p className="text-large block leading-none">0.000000</p>
        <p className="text-medium block leading-none">TON/hr</p>
      </div>
    </section>
  );
};
