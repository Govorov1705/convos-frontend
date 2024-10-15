import SettingsPersonal from "@/components/SettingsPersonal";
import SettingsSecurity from "@/components/SettingsSecurity";
import Spinner from "@/components/Spinner";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";

export default function Settings() {
  const { data: user, isLoading, isSuccess, isError } = useRetrieveUserQuery();

  let content;

  if (isLoading) {
    content = <Spinner lg center />;
  } else if (isSuccess) {
    content = (
      <>
        <SettingsPersonal user={user} />
        <SettingsSecurity user={user} />
      </>
    );
  } else if (isError) {
    content = (
      <h3 className="font-medium text-destructive">Error loading profile...</h3>
    );
  }

  return (
    <main className="h-full flex flex-col gap-5 p-3 rounded-xl border shadow lg:w-1/3 mx-auto bg-white">
      <div className="flex flex-col gap-5">
        <h1 className="tracking-tight text-2xl font-medium">Settings</h1>
        <hr />
      </div>
      <div className="w-full flex flex-col gap-5">{content}</div>
    </main>
  );
}
