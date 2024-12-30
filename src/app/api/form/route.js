// backend/api/forms/forms.js

import dbConnection from "@/backend/db/db";
import formModel from "@/backend/model/form";
import { NextResponse } from "next/server";

// GET API to fetch all form entries
export async function GET() {
  try {
    await dbConnection();
    const forms = await formModel.find(); // Fetch all form entries
    return NextResponse.json({
      message: 'Forms found',
      data: forms
    });
  } catch (error) {
    console.log(error, "error from get api");
    return NextResponse.json({
      message: "Internal server error",
      success: false
    });
  }
}

// POST API to create a new form entry
export async function POST(req) {
  try {
    await dbConnection();
    const body = await req.json(); // Parse the incoming request body
    const newForm = await formModel.create(body); // Create a new form entry
    return NextResponse.json({
      success: true,
      message: "Form Added Successfully!",
      data: newForm
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "Internal server error"
    });
  }
}
