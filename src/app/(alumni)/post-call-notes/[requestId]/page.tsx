import { PostCallNotesPage } from "@/features/alumni/components/PostCallNotesPage";
type Props = { params: Promise<{ requestId: string }> };
export default function Page(props: Props) { return <PostCallNotesPage {...props} />; }
