import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import { Table } from "@/features/table/components/Table";
import {
  EmployeeAllowanceChart,
  EmployeeContractChart,
} from "./EmployeeCharts";
import { PerformanceFilters } from "./PerformanceFilters";

interface PerformanceData {
  employeeName: string;
  team: string;
  contractCount: number;
  finalAllowance: number;
  period: string;
}

interface TeamDetailViewProps {
  selectedTeamDetail: string | null;
  selectedTeamMembers: PerformanceData[];
  selectedPeriod: string;
  selectedYear: string;
  yearOptions: string[];
  chartConfig: {
    totalAllowance: {
      label: string;
      color: string;
    };
    finalAllowance: {
      label: string;
      color: string;
    };
    contractCount: {
      label: string;
      color: string;
    };
  };
  onPeriodChange: (period: string) => void;
  onYearChange: (year: string) => void;
  onClose: () => void;
}

export function TeamDetailView({
  selectedTeamDetail,
  selectedTeamMembers,
  selectedPeriod,
  selectedYear,
  yearOptions,
  chartConfig,
  onPeriodChange,
  onYearChange,
  onClose,
}: TeamDetailViewProps) {
  if (!selectedTeamDetail) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">
              {selectedTeamDetail} 직원별 실적
            </CardTitle>
            <PerformanceFilters
              selectedPeriod={selectedPeriod}
              selectedYear={selectedYear}
              yearOptions={yearOptions}
              onPeriodChange={onPeriodChange}
              onYearChange={onYearChange}
              onClose={onClose}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EmployeeAllowanceChart
              selectedTeamMembers={selectedTeamMembers}
              chartConfig={chartConfig}
            />
            <EmployeeContractChart
              selectedTeamMembers={selectedTeamMembers}
              chartConfig={chartConfig}
            />
          </div>

          {/* 직원별 상세 목록 */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-4">직원별 상세 정보</h4>
            <Table
              data={selectedTeamMembers.map((member, index) => ({
                ...member,
                id: `${member.employeeName}-${index}`,
              }))}
              columns={[
                {
                  key: "employeeName",
                  label: "직원명",
                  sortable: true,
                },
                {
                  key: "contractCount",
                  label: "계약 건수",
                  sortable: true,
                  align: "center",
                  render: (value) => `${value}건`,
                },
                {
                  key: "finalAllowance",
                  label: "최종수당",
                  sortable: true,
                  align: "right",
                  render: (value) => (
                    <span className="font-bold text-gray-900">
                      {(value / 10000).toLocaleString()}만원
                    </span>
                  ),
                },
                {
                  key: "period",
                  label: "기간",
                  sortable: true,
                  align: "center",
                },
              ]}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
