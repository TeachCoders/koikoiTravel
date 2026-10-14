"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/shared/RichTextEditor";

export interface FaqData {
  id?: number;
  ques: string;
  ans: string;
}

interface FaqEditorProps {
  faqs: FaqData[];
  setFaqs: (faqs: FaqData[] | ((prev: FaqData[]) => FaqData[])) => void;
}

function FaqItemCard({
  faq,
  index,
  onUpdate,
  onRemove,
}: {
  faq: FaqData;
  index: number;
  onUpdate: (index: number, key: "ques" | "ans", value: string) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3.5 p-4 sm:p-5 bg-slate-50/70 hover:bg-slate-50 rounded-xl border border-slate-200/90 transition-colors relative group">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold text-[#2E8B8B] tracking-wider uppercase">
          FAQ #{index + 1}
        </span>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-slate-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50"
          title="Remove FAQ"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div>
        <Label className="text-xs font-semibold text-slate-700 mb-1.5 block">
          Question
        </Label>
        <Input
          placeholder="e.g. What is the best time for Ayurveda in Kerala?"
          value={faq.ques}
          onChange={(e) => onUpdate(index, "ques", e.target.value)}
          className="font-medium bg-white border-slate-200 focus:border-[#2E8B8B] focus:ring-[#2E8B8B]/20"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <Label className="text-xs font-semibold text-slate-700">
            Answer / Description
          </Label>
          <span className="text-[11px] text-slate-400">
            Select text and click <strong className="text-[#2E8B8B] font-semibold">Link (Ctrl+K)</strong> to add internal links
          </span>
        </div>
        <RichTextEditor
          content={faq.ans || ""}
          onChange={(html) => onUpdate(index, "ans", html)}
          placeholder="Write answer... Select any destination or tour name and click the Link icon to add an internal link."
          minHeight="min-h-[120px]"
          compact={true}
        />
      </div>
    </div>
  );
}

export default function FaqEditor({ faqs = [], setFaqs }: FaqEditorProps) {
  const removeFaq = (index: number) => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  const updateFaq = (index: number, key: "ques" | "ans", value: string) => {
    setFaqs((prev) =>
      prev.map((f, i) => (i === index ? { ...f, [key]: value } : f))
    );
  };

  const addFaq = () => {
    setFaqs((prev) => [...(prev || []), { ques: "", ans: "" }]);
  };

  const faqList = Array.isArray(faqs) ? faqs : [];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider block">
            Frequently Asked Questions
          </Label>
          <p className="text-xs text-slate-500 mt-1">
            Add SEO-friendly questions and rich answers with internal links for this page.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {faqList.map((faq, index) => (
          <FaqItemCard
            key={faq.id ? `faq-${faq.id}` : `faq-idx-${index}`}
            faq={faq}
            index={index}
            onUpdate={updateFaq}
            onRemove={removeFaq}
          />
        ))}

        {faqList.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-6 border border-dashed border-slate-300 rounded-xl bg-slate-50/50">
            No FAQs added yet. Click &quot;Add FAQ&quot; below to add one.
          </p>
        )}

        <button
          type="button"
          onClick={addFaq}
          className="flex items-center gap-2 text-sm font-semibold text-[#2E8B8B] hover:text-[#236c6c] transition-colors py-2 px-3 rounded-lg hover:bg-[#2E8B8B]/10 w-fit"
        >
          <Plus size={16} />
          Add FAQ
        </button>
      </div>
    </div>
  );
}
