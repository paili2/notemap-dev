import type { TableData } from "@/features/table/types/table";

// 계약기록 기반 실적 데이터 타입
export interface PerformanceData extends TableData {
  id: string;
  employeeName: string;
  team: string;
  contractCount: number; // 계약 건수
  finalAllowance: number; // 최종수당 합계
  period: string;
}

export const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
