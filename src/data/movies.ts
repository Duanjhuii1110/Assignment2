// 观影清单：想加一部，就在这里加一行，然后跟我说一声"推送"即可。
// rating 填 1-5 的整数打分；不想打分就写 null（页面显示"未评分"）。
// note 是可选的短评，一两句话，不写也行。

export type Movie = {
  title: string;
  kind: '电影' | '剧集';
  year: string;
  rating: number | null;
  note?: string;
};

export const MOVIES: Movie[] = [
  { title: '星际穿越', kind: '电影', year: '2014', rating: null },
  { title: '怪奇物语', kind: '剧集', year: '2016', rating: null },
  { title: '星期三', kind: '剧集', year: '2022', rating: null },
  { title: '第二十条', kind: '电影', year: '2024', rating: null },
  { title: '镖人', kind: '电影', year: '2026', rating: null },
  { title: '惊蛰无声', kind: '电影', year: '2025', rating: null },
];
