import { Header } from "@/components/layout/Header";
import { Avatar } from "@/components/shared/Avatar";
import { SettingsSidebar } from "@/components/shared/SettingsSidebar";
import { SettingsCard } from "@/components/shared/SettingsCard";
import { ToggleRow } from "@/components/shared/ToggleRow";
import { STUDENT } from "@/server/modules/students/student.mock";

export function SettingsPage() {
  return (
    <div className="min-h-screen bg-oaa-bg">
      <Header
        rightContent={
          <Avatar variant="student" name={STUDENT.name} size="sm" />
        }
      />

      <main className="mx-auto max-w-[1200px] px-8 pb-32 pt-12">
        <h1 className="mb-10 font-sans text-[40px] font-semibold leading-[1.05] tracking-[-0.01em] text-oaa-ink">
          Settings
        </h1>

        <div className="grid grid-cols-[200px_1fr] gap-12">
          {/* Sidebar */}
          <SettingsSidebar />

          {/* Cards */}
          <div className="flex flex-col gap-6">
            {/* Account */}
            <SettingsCard
              id="account"
              heading="Account"
              subtitle="Manage your login and personal details."
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-medium text-oaa-ink">Email address</p>
                  <p className="text-[13px] text-oaa-muted">maya.chen@mail.mcgill.ca</p>
                </div>
                <button
                  type="button"
                  className="text-[13px] text-oaa-clay hover:underline"
                >
                  Change
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-medium text-oaa-ink">Password</p>
                  <p className="text-[13px] text-oaa-muted">Last changed 30 days ago</p>
                </div>
                <button
                  type="button"
                  className="text-[13px] text-oaa-clay hover:underline"
                >
                  Change
                </button>
              </div>
            </SettingsCard>

            {/* Notifications */}
            <SettingsCard
              id="notifications"
              heading="Notifications"
              subtitle="Choose what emails you receive from One Ask Away."
            >
              <ToggleRow
                id="notif-accepted"
                label="Request accepted"
                description="When an alumni accepts your request."
                defaultChecked
              />
              <ToggleRow
                id="notif-declined"
                label="Request declined"
                description="When an alumni declines your request."
                defaultChecked
              />
              <ToggleRow
                id="notif-reminder-24h"
                label="Call reminder — 24h before"
                description="An email the day before a confirmed call."
                defaultChecked
              />
              <ToggleRow
                id="notif-reminder-1h"
                label="Call reminder — 1h before"
                description="An email one hour before a confirmed call."
              />
              <ToggleRow
                id="notif-matches"
                label="New matches"
                description="When new alumni matches are found for you."
                defaultChecked
              />
            </SettingsCard>

            {/* Availability */}
            <SettingsCard
              id="availability"
              heading="Availability"
              subtitle="Your availability is managed from your profile."
            >
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-oaa-muted">
                  Update the times you are open to calls with alumni.
                </p>
                <a
                  href="/profile"
                  className="text-[13px] text-oaa-clay hover:underline"
                >
                  Go to profile →
                </a>
              </div>
            </SettingsCard>

            {/* Privacy */}
            <SettingsCard
              id="privacy"
              heading="Privacy"
              subtitle="Control how your profile is shown to alumni."
            >
              <ToggleRow
                id="privacy-profile-visible"
                label="Profile visible to alumni"
                description="Alumni can see your profile when reviewing a request from you."
                defaultChecked
              />
              <ToggleRow
                id="privacy-show-cohort"
                label="Show cohort year on profile"
                description="Displays your program year to alumni."
                defaultChecked
              />
            </SettingsCard>

            {/* Danger zone */}
            <SettingsCard
              id="danger"
              heading="Danger zone"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-medium text-oaa-ink">Delete account</p>
                  <p className="text-[13px] text-oaa-muted">
                    Permanently remove your account and all data.
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-sm border border-red-200 px-4 py-2 text-[13px] text-red-600 transition-colors hover:border-red-400 hover:text-red-700"
                >
                  Delete account
                </button>
              </div>
            </SettingsCard>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SettingsPage;
