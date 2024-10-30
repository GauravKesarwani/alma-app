"use server";
import db from "@/utils/db";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";
import { Lead } from "@/components/LeadList";

export const newLead = async (data: Omit<Lead, "date" | "status"> | null) => {
  console.log("form action ", data);
  // const newLead = data.get("lead") as unknown as {
  //   firstName: string;
  //   lastName: string;
  //   email: string;
  //   country: string;
  // };

  if (data) {
    const { firstName, lastName, country, email } = data;
    await db.lead.create({
      data: {
        id: uuidv4(),
        firstName,
        lastName,
        email,
        country,
        status: "PENDING",
      },
    });
    revalidatePath("/leads");
  }
};

export const updateLeadStatus = async (id: string) => {
  await db.lead.update({
    where: { id },
    data: {
      status: "REACHED_OUT",
    },
  });
  revalidatePath("/leads");
};
