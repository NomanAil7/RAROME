import { NextResponse } from "next/server";
import { database } from "../../db"; // Assuming you have db.js to connect to MySQL

export async function GET() {
  try {
    const schools = await database.query("SELECT * FROM schools");
    //return NextResponse.json(schools);
    return NextResponse.json(schools); // ✅ Return only the rows
  } catch (error) {
    console.error("Detailed Error fetching schools:", error); 
    return NextResponse.json({ error: "Failed to fetch schools" }, { status: 500 });
  }
}
