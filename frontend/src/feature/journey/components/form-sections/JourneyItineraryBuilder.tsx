import React from "react";
import DayItineraryEditor from "@/components/shared/DayItineraryEditor";
import ListEditor from "@/components/shared/ListEditor";
import FaqEditor, { FaqData } from "@/components/shared/FaqEditor";
import type { DayPlan } from "@/components/shared/DayItineraryEditor";

interface JourneyItineraryBuilderProps {
  formData: any;
  days: DayPlan[];
  setDays: React.Dispatch<React.SetStateAction<DayPlan[]>>;
  inclusions: string[];
  setInclusions: React.Dispatch<React.SetStateAction<string[]>>;
  highlights: string[];
  setHighlights: React.Dispatch<React.SetStateAction<string[]>>;
  exclusions: string[];
  setExclusions: React.Dispatch<React.SetStateAction<string[]>>;
  whyChooseUs: string[];
  setWhyChooseUs: React.Dispatch<React.SetStateAction<string[]>>;
  bookingPolicyList: string[];
  setBookingPolicyList: React.Dispatch<React.SetStateAction<string[]>>;
  faqs: FaqData[];
  setFaqs: any;
}

export default function JourneyItineraryBuilder({ 
  formData,
  days, setDays,
  inclusions, setInclusions,
  highlights, setHighlights,
  exclusions, setExclusions,
  whyChooseUs, setWhyChooseUs,
  bookingPolicyList, setBookingPolicyList,
  faqs, setFaqs
}: JourneyItineraryBuilderProps) {

  // Auto-sync days based on noDays input in formData
  React.useEffect(() => {
    setDays((prev) => {
      const num = Number(formData.noDays);
      const target = Number.isFinite(num) && num > 0 ? num : prev.length;
      if (target > prev.length) {
        const newDays = [...prev];
        for (let i = prev.length; i < target; i++) {
          newDays.push({ day: i + 1, title: `Day ${i + 1}`, content: "" });
        }
        return newDays;
      } else if (target < prev.length) {
        return prev.slice(0, target);
      }
      return prev;
    });
  }, [formData.noDays, setDays]);



  const moveDay = (fromIdx: number, toIdx: number) => {
    setDays((prev) => {
      const arr = [...prev];
      const [item] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, item);
      return arr;
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-5">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Day by Day Itinerary</h2>
        
        <div className="space-y-4">
          <DayItineraryEditor
            value={days}
            onChange={setDays}
          />
          {days.length === 0 && (
            <p className="text-sm text-slate-500 text-center py-4">Increase "Number of Days" in General tab to add itinerary days.</p>
          )}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-5">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Additional Information</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-700">Highlights</h4>
            <ListEditor
              value={highlights}
              onChange={setHighlights}
              placeholder="Add a highlight..."
            />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-700">Inclusions</h4>
            <ListEditor
              value={inclusions}
              onChange={setInclusions}
              placeholder="Add an inclusion..."
            />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-700">Exclusions</h4>
            <ListEditor
              value={exclusions}
              onChange={setExclusions}
              placeholder="Add an exclusion..."
            />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-700">Why Choose Us</h4>
            <ListEditor
              value={whyChooseUs}
              onChange={setWhyChooseUs}
              placeholder="Add a reason..."
            />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-700">Booking Policies</h4>
            <ListEditor
              value={bookingPolicyList}
              onChange={setBookingPolicyList}
              placeholder="Add a policy..."
            />
          </div>
        </div>
      </div>

      <FaqEditor faqs={faqs} setFaqs={setFaqs} />
    </div>
  );
}
