type MultiLevelBarConfigPrecision =  1 | 2 | 3;
export type MultiLevelBarConfig = {
  allocated: number;
  allocatedPrecision: MultiLevelBarConfigPrecision;
  used: number;
  usedPrecision: MultiLevelBarConfigPrecision;
  total: number;
  totalPrecision: MultiLevelBarConfigPrecision;
}
