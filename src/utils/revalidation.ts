/**
 * ISR を実行するための API を叩く関数
 */

export const revalidateList = () => {
  fetch('/api/revalidate');
};

export const revalidateSingle = (id: string) => {
  fetch(`/api/revalidate/${id}`);
};
