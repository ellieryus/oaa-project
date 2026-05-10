import { AskComposerPage } from "@/features/requests/components/AskComposerPage";
type Props = { params: Promise<{ alumniId: string }> };
export default function Page(props: Props) { return <AskComposerPage {...props} />; }
