import { Page } from "@/shared/ui";

export const BannedPage = () => {
  return (
    <Page>
      <div className="flex items-center justify-center h-screen bg-[#111217]">
        <section className="flex flex-col items-center gap-4 max-w-md text-center">
          <div className="text-[80px] animate-pulse leading-none">🚫</div>

          <h1 className="text-title-negative">Вы забанены</h1>

          <h2 className="text-white-heading">Доступ запрещён</h2>

          <p className="text-banned-description">
            Ваш аккаунт был заблокирован за нарушение правил сообщества.
          </p>

          <p className="text-white-strong-16">
            Если вы считаете, что произошла ошибка, обратитесь к администратору:{" "}
            <a href="mailto:support@example.com" className="text-link">
              support@example.com
            </a>
          </p>
        </section>
      </div>
    </Page>
  );
};
