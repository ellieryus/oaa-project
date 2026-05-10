import { OnboardingHeader } from "./OnboardingHeader";

type Props = {
  email?: string;
  exitHref?: string;
  className?: string;
};

export function AlumnusOnboardingHeader({
  email = "adam.farouk@mail.mcgill.ca",
  exitHref = "/",
  className,
}: Props) {
  return (
    <OnboardingHeader
      email={email}
      eyebrow="Alumnus onboarding"
      exitHref={exitHref}
      className={className}
    />
  );
}
