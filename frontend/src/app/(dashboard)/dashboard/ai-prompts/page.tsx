import React from "react";
import AiPromptsManager from "@/feature/aiPrompt/components/AiPromptsManager";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Prompt Studio | Dashboard",
  description: "Manage AI generation master prompts and rules for tours, blogs, and destinations",
};

export default function AiPromptsPage() {
  return <AiPromptsManager />;
}
