import { PastStudentDetailPage } from "@/features/alumni/components/PastStudentDetailPage";
type Props = { params: Promise<{ studentId: string }> };
export default function Page(props: Props) { return <PastStudentDetailPage {...props} />; }
