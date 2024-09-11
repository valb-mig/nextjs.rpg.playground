"use client";

import FormProfile from "@layout/Settings/FormProfile";
import FormPassword from "@layout/Settings/FormPassword";
import LoadingScreen from "@layout/LoadingScreen";

const Settings = () => {

  return (
    <>
      <LoadingScreen loading={false} />

      <div className="flex flex-col w-full p-8 gap-8">

        <section className="flex flex-col border border-dashed border-shade-4 rounded-lg">
          
          {/* Profile */}
          <FormProfile/>

          {/* Password */}
          <FormPassword/>

        </section>

      </div>
    </>
    
  );
};

export default Settings;
