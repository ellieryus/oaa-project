import { AlumnusDetailPage } from "@/features/matching/components/AlumnusDetailPage";
type Props = { params: Promise<{ id: string }> };
export default function Page(props: Props) { return <AlumnusDetailPage {...props} />; }
