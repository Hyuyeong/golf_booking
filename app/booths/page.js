import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import Boothlist from "./BoothList";
function Page() {
  return (
    <div className="p-6">
      <div className="overflow-x-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Booth Information</h1>
        {/* <Suspense fallback={<Spinner />}> */}
        <Boothlist />
        {/* </Suspense> */}
      </div>
    </div>
  );
}

export default Page;
