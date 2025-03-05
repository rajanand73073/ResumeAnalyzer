import { NextResponse } from "next/server";




  export async function POST(req) {
   try {
      const { resumeText } = await req.json();
      console.log("ResumeText Passed Here");


      if (!resumeText) {
         return NextResponse.json(400, "Error while sending resume Text")
      }

      const keywords = ["Technical Skills", "Skills", "Programming Languages"]
      const skillsText = extractSection(resumeText, keywords)
      return NextResponse.json(200, { skillsText })
   } catch (error) {
      console.error("Error", error.message)
      return NextResponse.json({ error: "Server Error" }, { status: 500 });

   }
}


   const extractSection = (resumeText, keywords) => {
   const keywordPattern = keywords.join("|")
   // The .join() method is used to convert an array into a string by joining its elements with a specified separator.


   const regex = new RegExp(`(${keywordPattern})[:\\n]([\\s\\S]*?)(\\n[A-Z]|$)`, "i");
   //"i" It makes the regular expression ignore case sensitivity, meaning it will match both uppercase and lowercase letters.
   const match = resumeText.match(regex)

   console.log("Matched Keyword", match[2]);
   return match ? match[2].trim() : null; // ✅ Extract matched section
   // Why match[2]?
   // match[1] → The keyword itself (e.g., "Technical Skills")
   // match[2] → The actual content under the keyword that we need.
   // match[3] → The detected next section, used as a stopping point.



}