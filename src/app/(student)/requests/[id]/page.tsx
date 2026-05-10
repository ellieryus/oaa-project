import { RequestDetailPage } from "@/features/requests/components/RequestDetailPage";
type Props = { params: Promise<{ id: string }> };
export default function Page(props: Props) { return <RequestDetailPage {...props} />; }
