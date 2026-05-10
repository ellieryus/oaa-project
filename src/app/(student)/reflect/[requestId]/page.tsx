import { ReflectPage } from "@/features/student/components/ReflectPage";
type Props = { params: Promise<{ requestId: string }> };
export default function Page(props: Props) { return <ReflectPage {...props} />; }
