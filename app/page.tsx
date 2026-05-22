import DashBoardClient from "./DashBoard.client";
import { getWeekStatic } from "@/lib/api/apiClient";

export default async function Dashboard() {
  const weekInfo = await getWeekStatic();
  return <>{weekInfo && <DashBoardClient weekInfo={weekInfo} />}</>;
}
