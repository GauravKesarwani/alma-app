import LeadList from "@/components/LeadList";
import db from "@/utils/db";

const getData = async () => {
  const leads = await db.lead.findMany({
    where: {},
    orderBy: {
      date: "desc",
    },
  });

  return leads;
};

const LeadsPage = async () => {
  const leads = await getData();

  return (
    <>
      <LeadList leads={leads} />
    </>
  );
};

export default LeadsPage;
