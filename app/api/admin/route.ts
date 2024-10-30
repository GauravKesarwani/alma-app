import db from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  const data = await db.lead.findMany({});
  return NextResponse.json({ data });
};

export const POST = async (request: Request) => {
  const data = await request.json();
  const lead = await db.lead.create({ data });
  return NextResponse.json({ data: lead });
};
