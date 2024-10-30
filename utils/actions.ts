"use server";
import db from "@/utils/db";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";

export const newLead = async (data: FormData) => {
  const newLead = data.get("lead") as unknown as {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
  };

  if (newLead) {
    await db.lead.create({
      data: {
        id: uuidv4(),
        firstName: newLead.firstName,
        lastName: newLead.lastName,
        email: newLead.email,
        country: newLead.country,
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
