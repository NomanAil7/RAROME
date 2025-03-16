// import { NextResponse } from "next/server";
// import { database } from "../../../db"; 

// export async function GET(req, context) {
//   const { id } = context.params;
//   try {
//     const [rows] = await  database.query("SELECT * FROM schools WHERE id = ?", [id]);
//     if (rows.length === 0) {
//       return NextResponse.json({ error: "School not found" }, { status: 404 });
//     }
//     return NextResponse.json(rows[0]); // Send single school data
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Database Error" }, { status: 500 });
//   }
// }

// export async function PUT(req, { params }) {
//   const { id } = params;
//   const body = await req.json();

//   try {
//     await database.query(
//       "UPDATE schools SET name = ?, description = ?, contact_email = ?, contact_phone = ?, address = ? WHERE id = ?",
//       [body.name, body.description, body.contact_email, body.contact_phone, body.address, id]
//     );

//     const [updatedRows] = await database.query("SELECT * FROM schools WHERE id = ?", [id]);
//     return Response.json(updatedRows[0]);
//   } catch (error) {
//     console.error("Error updating school:", error);
//     return new Response("Error updating school", { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { database } from "../../../db";

export async function GET(req, context) {
  const { id } = context.params;
  try {
    const [rows] = await database.query("SELECT * FROM schools WHERE id = ?", [id]);
    if (rows.length === 0) {
      return NextResponse.json({ error: "School not found" }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Database Error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  try {
    await database.query(
      "UPDATE schools SET name = ?, description = ?, contact_email = ?, contact_phone = ? WHERE id = ?",
      [body.name, body.description, body.contact_email, body.contact_phone, id]
    );

    const [updatedRows] = await database.query("SELECT * FROM schools WHERE id = ?", [id]);
    return NextResponse.json(updatedRows[0]); // <-- Corrected
  } catch (error) {
    console.error("Error updating school:", error);
    return NextResponse.json({ error: "Error updating school" }, { status: 500 });
  }
}
