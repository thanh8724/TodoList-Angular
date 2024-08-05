interface ITask {
    id: number;
    progress: number; // tiến độ
    priority: number; // độ ưu tiên
    date: string;
    owner: string;
    description: string;
}