import dbConnection from "@/backend/db/db";
import formModel from "@/backend/model/form";
import { NextResponse } from "next/server";

// DELETE API to delete a form entry by ID
export async function DELETE(req, { params }) {
  try {
    await dbConnection();
    const id = params.id;

    const deletedForm = await formModel.findByIdAndDelete(id);

    if (!deletedForm) {
      return NextResponse.json({
        success: false,
        message: "Form not found",
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Form deleted successfully",
      data: deletedForm,
    });

  } catch (error) {
    console.log("Error deleting form:", error.message);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}

// PUT API to update a form entry by ID
export async function PUT(req, { params }) {
  try {
    await dbConnection();
    const id = params.id;
    const updateData = await req.json();

    // Ensure update data exists
    if (!updateData || Object.keys(updateData).length === 0) {
      return NextResponse.json({
        success: false,
        message: "Update data is required",
      }, { status: 400 });
    }

    const updatedForm = await formModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }  // Return the updated document
    );

    if (!updatedForm) {
      return NextResponse.json({
        success: false,
        message: "Form not found",
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Form updated successfully",
      data: updatedForm,
    });

  } catch (error) {
    console.log("Error updating form:", error.message);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, { status: 500 });
  }
}
