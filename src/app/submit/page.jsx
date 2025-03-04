"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";

export default function SubmitPage() {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    console.log("file info", e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedin: "",
    skills: "",
    experience: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    console.log("Before appending data:", formDataToSend); // Check if it's being created

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    console.log("After adding text fields:", [...formDataToSend.entries()]); // Log form data entries

    if (file) {
      formDataToSend.append("resume", file);
      console.log("Added file:", file.name, file.size, file.type);
    }
    console.log("Final FormData Entries:", [...formDataToSend.entries()]);

    try {
    
      const response = await axios.post("/api/submit", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("response", response.data);

      toast("Successfully Send Data", {
        description: "Your FormData Successfully Send",
      });
    } catch (error) {
      toast("Successfully Send Data", {
        description: "Your FormData Successfully Send",
      });
      console.error("Submission failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Submit Your Resume
        </h2>

        <form className="space-y-4 " onSubmit={handleSubmit}>
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <Input
              type="text"
              placeholder="John Doe"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <Input
              type="email"
              placeholder="john@example.com"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* LinkedIn URL Field */}
          <div>
            <label className="block text-sm font-medium">LinkedIn URL</label>
            <Input
              type="url"
              placeholder="https://linkedin.com/in/yourprofile"
              name="linkedin"
              required
              value={formData.linkedin}
              onChange={handleChange}
            />
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium">
              Upload Resume (PDF)
            </label>
            <Input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              name="file"
              required
            />
            {file && <p className="text-sm text-gray-600 mt-1">{file.name}</p>}
          </div>

          {/* Skills & Experience */}
          <div>
            <label className="block text-sm font-medium">Skills</label>
            <Input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium">Experience</label>
            <Input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button with Animation */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg transition-all duration-500"
            >
              Submit Application
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
