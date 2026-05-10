import { SentConfirmationPage as AskSentPage } from "@/features/requests/components/AskSentPage";
type Props = { params: Promise<{ alumniId: string }> };
export default function Page(props: Props) { return <AskSentPage {...props} />; }
