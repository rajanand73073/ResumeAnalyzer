"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-100">
      {/* Hero Section */}
      <motion.div 
        className="text-center space-y-6 max-w-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-900">
          AI-Powered Candidate Evaluation
        </h1>
        <p className="text-lg text-gray-600">
          Submit your resume, get AI-driven insights, and find your perfect job match.
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          onClick={() => router.push("/submit")}>
          Get Started
        </Button>
      </motion.div>

      {/* Features Section */}
      <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-5xl">
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold">📄 Resume Parsing</h3>
            <p className="text-gray-600">
              Extract key skills, experience, and education from resumes using AI.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold">🤖 AI-Powered Ranking</h3>
            <p className="text-gray-600">
              Compare resumes with job descriptions using Google Gemini & RAG.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold">📊 AI Feedback & Scoring</h3>
            <p className="text-gray-600">
              Get AI-generated feedback and recommendations for career growth.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <motion.div 
        className="mt-16 text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold">Try AI Resume Evaluation Today</h2>
        <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          onClick={() => router.push("/submit")}>
          Submit Resume
        </Button>
      </motion.div>
    </main>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 7ec03b3 (Initial commit or updated changes)
