import { InboxRequestDetailPage } from "@/features/alumni/components/InboxRequestDetailPage";
type Props = { params: Promise<{ requestId: string }> };
export default function Page(props: Props) { return <InboxRequestDetailPage {...props} />; }
