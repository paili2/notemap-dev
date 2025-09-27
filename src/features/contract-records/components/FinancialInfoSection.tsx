"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import { Input } from "@/components/atoms/Input/Input";
import { Label } from "@/components/atoms/Label/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/Select/Select";
import { Textarea } from "@/components/atoms/Textarea/Textarea";
import type { FinancialInfo } from "../types/contract-records";
import { formatCurrency } from "../utils/utils";

interface FinancialInfoSectionProps {
  financialInfo: FinancialInfo;
  onFinancialInfoChange: (info: FinancialInfo) => void;
}

export function FinancialInfoSection({
  financialInfo,
  onFinancialInfoChange,
}: FinancialInfoSectionProps) {
  const handleInputChange = (
    field: keyof FinancialInfo,
    value: string | number
  ) => {
    const numValue = typeof value === "string" ? parseFloat(value) || 0 : value;
    onFinancialInfoChange({ ...financialInfo, [field]: numValue });
  };

  const handleStringInputChange = (
    field: keyof FinancialInfo,
    value: string
  ) => {
    onFinancialInfoChange({ ...financialInfo, [field]: value });
  };

  const handleRebateInputChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    // 리베이트 입력값을 실제 금액으로 변환 (1 = 100만원, 0.5 = 50만원)
    const actualAmount = numValue * 1000000;
    onFinancialInfoChange({ ...financialInfo, totalRebate: actualAmount });
  };

  const handleTaxStatusChange = (value: string) => {
    onFinancialInfoChange({
      ...financialInfo,
      taxStatus: value as "taxable" | "tax-free",
    });
  };

  return (
    <Card className="flex-shrink-0">
      <CardHeader className="pb-1 pt-2 px-3">
        <CardTitle className="text-sm">금액 정보</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-1">
        <div className="flex items-end gap-4 flex-wrap overflow-x-auto">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">중개보수금</Label>
            <div className="flex items-center gap-1">
              <Input
                type="number"
                value={
                  financialInfo.brokerageFee === 0
                    ? ""
                    : financialInfo.brokerageFee
                }
                onChange={(e) =>
                  handleInputChange("brokerageFee", e.target.value)
                }
                className="h-7 text-xs min-w-24 w-auto"
                placeholder="0"
              />
              <span className="text-xs text-muted-foreground">원</span>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">부가세</Label>
            <Select
              value={financialInfo.vatStatus || "vat-included"}
              onValueChange={(value) =>
                onFinancialInfoChange({
                  ...financialInfo,
                  vatStatus: value as "vat-included" | "vat-excluded",
                })
              }
            >
              <SelectTrigger className="h-7 text-xs min-w-24 w-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vat-included" className="text-xs">
                  부가세
                </SelectItem>
                <SelectItem value="vat-excluded" className="text-xs">
                  미부가세
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">
              중개보수금합계
            </Label>
            <div className="flex items-center gap-1">
              <Input
                type="number"
                value={financialInfo.totalBrokerageFee}
                onChange={(e) =>
                  handleInputChange("totalBrokerageFee", e.target.value)
                }
                className="h-7 text-xs min-w-24 w-auto"
                placeholder="0"
              />
              <span className="text-xs text-muted-foreground">원</span>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">
              총리베이트(R)
            </Label>
            <div className="flex items-center gap-1">
              <Input
                type="number"
                step="0.1"
                value={
                  financialInfo.totalRebate === 0
                    ? ""
                    : financialInfo.totalRebate / 1000000
                }
                onChange={(e) => handleRebateInputChange(e.target.value)}
                className="h-7 text-xs min-w-24 w-auto"
                placeholder="0"
              />
              <span className="text-xs text-muted-foreground">R</span>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">과세 여부</Label>
            <Select
              value={financialInfo.taxStatus}
              onValueChange={handleTaxStatusChange}
            >
              <SelectTrigger className="h-7 text-xs min-w-20 w-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="taxable" className="text-xs">
                  과세
                </SelectItem>
                <SelectItem value="tax-free" className="text-xs">
                  비과세
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">지원금액</Label>
            <div className="flex items-center gap-1">
              <Input
                type="number"
                value={
                  financialInfo.totalSupportAmount === 0
                    ? ""
                    : financialInfo.totalSupportAmount
                }
                onChange={(e) =>
                  handleInputChange("totalSupportAmount", e.target.value)
                }
                className="h-7 text-xs min-w-24 w-auto"
                placeholder="0"
              />
              <span className="text-xs text-muted-foreground">원</span>
            </div>
          </div>
        </div>

        {/* 고객 계좌 정보 */}
        <div className="mt-4 space-y-3">
          <div className="text-sm font-medium text-gray-700">고객 계좌</div>
          <div className="flex items-end gap-4 flex-wrap">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">은행</Label>
              <Input
                value={financialInfo.customerBank || ""}
                onChange={(e) =>
                  handleStringInputChange("customerBank", e.target.value)
                }
                className="h-7 text-xs min-w-32 w-auto"
                placeholder="은행명 입력"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">계좌번호</Label>
              <Input
                value={financialInfo.customerAccountNumber || ""}
                onChange={(e) =>
                  handleStringInputChange(
                    "customerAccountNumber",
                    e.target.value
                  )
                }
                className="h-7 text-xs min-w-40 w-80"
                placeholder="계좌번호 입력"
              />
            </div>
          </div>
        </div>

        {/* 지원 내용 */}
        <div className="mt-4 space-y-2">
          <Label className="text-sm font-medium text-gray-700">지원 내용</Label>
          <Textarea
            value={financialInfo.supportContent || ""}
            onChange={(e) =>
              handleStringInputChange("supportContent", e.target.value)
            }
            className="min-h-20 text-xs resize-none"
            placeholder="지원 내용을 입력하세요"
          />
        </div>

        <div className="mt-3 space-y-2">
          {/* 계산 공식들 */}
          <div className="text-xs text-muted-foreground space-y-1">
            <div>계산 공식:</div>
            <div>
              • (중개보수금 + 부가세) +{" "}
              {financialInfo.taxStatus === "taxable"
                ? "(리베이트 × 0.967)"
                : "리베이트"}{" "}
              - 지원금액 ={" "}
              {(() => {
                const brokerageAndVat =
                  financialInfo.brokerageFee + financialInfo.vat;
                const rebateAmount =
                  financialInfo.taxStatus === "taxable"
                    ? financialInfo.totalRebate * 0.967 // 과세시 리베이트에만 3.3% 차감
                    : financialInfo.totalRebate; // 비과세시 리베이트 그대로
                const finalTotal =
                  brokerageAndVat +
                  rebateAmount -
                  financialInfo.totalSupportAmount;
                return formatCurrency(finalTotal);
              })()}
              원
            </div>
            <div className="text-xs text-gray-500">
              {financialInfo.taxStatus === "taxable"
                ? "• 과세 적용 (리베이트에만 3.3% 차감)"
                : "• 비과세 적용"}
            </div>
          </div>

          {/* 총 합계 */}
          <div className="p-2 bg-primary/10 rounded-lg">
            <div className="text-sm font-medium mb-1">총 합계</div>
            <div className="text-lg font-bold text-primary">
              {(() => {
                const brokerageAndVat =
                  financialInfo.brokerageFee + financialInfo.vat;
                const rebateAmount =
                  financialInfo.taxStatus === "taxable"
                    ? financialInfo.totalRebate * 0.967 // 과세시 리베이트에만 3.3% 차감
                    : financialInfo.totalRebate; // 비과세시 리베이트 그대로
                const finalTotal =
                  brokerageAndVat +
                  rebateAmount -
                  financialInfo.totalSupportAmount;
                return formatCurrency(finalTotal);
              })()}
              원
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
