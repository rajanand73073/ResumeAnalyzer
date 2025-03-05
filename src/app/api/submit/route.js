import { NextResponse } from "next/server";
import fs from "fs/promises";
import { writeFile } from "fs/promises";
import path, { resolve } from "path";
import PdfParse from "pdf-parse";
import { v2 as cloudinary } from 'cloudinary';
import { rejects } from "assert";
import { error } from "console";
import { Candidate } from "@/model/Candidate.model";
import dbConnect from "@/lib/dbConnect";
import axios from "axios";


// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



export async function POST(req) {

  try {
    const formdata = await req.formData()

    const file = await formdata.get('resume')

    if (!file) {
      throw new Error(400, "File not Exist");
    }


    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);


    const cwd = process.cwd();
    const filePath = path.join(cwd, 'public/upload', file.name);
    await writeFile(filePath, buffer)


    // Read the file correctly
    const pdfBuffer = await fs.readFile(filePath); // ✅ Use correct path


    // Parse the PDF
    const pdfData = await PdfParse(pdfBuffer);
    console.log("Number of pages:", pdfData.numpages);
    console.log("Pdfdata:", pdfData);

    const resumeText = pdfData.text;



    const name = await formdata.get('name')
    const email = await formdata.get('email')
    const linkedin = await formdata.get('linkedin')
    const skills = await formdata.get('skills')
    const experience = await formdata.get('experience')

    console.log(name, email, linkedin, skills, experience);


    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          format: "jpg",
          folder: "resume-upload"
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(buffer)
    });

    console.log("uploaded file", result);
    // Delete local file after upload
    await fs.unlink(filePath);
    console.log("Pdf Text: ",resumeText);

    const resumePath = result.url;

    await dbConnect();
    const newCandidate = await new Candidate({
      name,
      email,
      linkedin,
      skills,
      experience,
      resumeText,
      resumePath
    })

    await newCandidate.save()
    console.log("candidate", newCandidate);

   
  await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/extract-keywords`, { resumeText })
  .then((response) => {
  console.log("🔍 Keyword extraction started:", response.data);
})
.catch((error) => {
  console.error("❌ Keyword extraction failed:", error.response?.data || error.message);
});


 return NextResponse.json(200, { newCandidate }, "Successfully Candidate Saved")
  } catch (error) {
    console.error("Error processing resume:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}


