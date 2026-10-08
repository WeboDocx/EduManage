import React, { useState } from 'react';
import { ScreenType } from '../types';

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (courseData: {
    title: string;
    code: string;
    category: string;
    duration: string;
    fee: string;
    campus: string;
    seats: number;
  }) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const CreateCourseModal: React.FC<CreateCourseModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onNavigate,
}) => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('CR-2026-');
  const [category, setCategory] = useState('Information Technology');
  const [duration, setDuration] = useState('6 Months');
  const [fee, setFee] = useState('24000');
  const [campus, setCampus] = useState('Siliguri HQ');
  const [seats, setSeats] = useState(30);
  const [timing, setTiming] = useState('Morning 09:00 AM - 11:30 AM');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSuccess({
      title: title.trim(),
      code: code.trim() || `CR-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      duration,
      fee,
      campus,
      seats: Number(seats) || 30,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-150 my-8">
        {/* Header */}
        <div className="px-5 py-4 border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">library_add</span>
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-on-surface">Create New Course</h3>
              <p className="text-[11px] text-outline">Add academic program or certification cohort</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          {/* Course Title */}
          <div>
            <label className="block font-semibold uppercase text-[10px] text-outline mb-1">
              Course Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Full Stack AI & Web Engineering"
              value={title}
              onChange={e => {
                setTitle(e.target.value);
                if (code.startsWith('CR-2026-') && e.target.value.length > 2) {
                  const acronym = e.target.value
                    .split(' ')
                    .map(w => w[0])
                    .filter(Boolean)
                    .slice(0, 3)
                    .join('')
                    .toUpperCase();
                  setCode(`CR-${acronym}-${Math.floor(10 + Math.random() * 90)}`);
                }
              }}
              className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
            />
          </div>

          {/* Code & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold uppercase text-[10px] text-outline mb-1">
                Course Code *
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={e => setCode(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface font-mono text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-[10px] text-outline mb-1">
                Department / Stream
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full h-9 px-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface text-xs focus:outline-none cursor-pointer"
              >
                <option>Information Technology</option>
                <option>Design & UI/UX</option>
                <option>Accounts & Finance</option>
                <option>Digital Marketing</option>
                <option>Language & Soft Skills</option>
              </select>
            </div>
          </div>

          {/* Duration, Fee & Max Seats */}
          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block font-semibold uppercase text-[10px] text-outline mb-1">
                Duration
              </label>
              <select
                value={duration}
                onChange={e => setDuration(e.target.value)}
                className="w-full h-9 px-2 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface text-xs focus:outline-none cursor-pointer"
              >
                <option>3 Months</option>
                <option>6 Months</option>
                <option>9 Months</option>
                <option>1 Year</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold uppercase text-[10px] text-outline mb-1">
                Total Fee (₹)
              </label>
              <input
                type="number"
                required
                value={fee}
                onChange={e => setFee(e.target.value)}
                className="w-full h-9 px-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface font-mono text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-[10px] text-outline mb-1">
                Batch Capacity
              </label>
              <input
                type="number"
                min="10"
                max="120"
                value={seats}
                onChange={e => setSeats(Number(e.target.value))}
                className="w-full h-9 px-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface font-mono text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* Primary Campus & Schedule */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold uppercase text-[10px] text-outline mb-1">
                Primary Campus
              </label>
              <select
                value={campus}
                onChange={e => setCampus(e.target.value)}
                className="w-full h-9 px-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface text-xs focus:outline-none cursor-pointer"
              >
                <option>Siliguri HQ</option>
                <option>Binnaguri Hub</option>
                <option>Jalpaiguri City</option>
                <option>Cooch Behar</option>
                <option>All Campuses (8)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold uppercase text-[10px] text-outline mb-1">
                Batch Shift
              </label>
              <select
                value={timing}
                onChange={e => setTiming(e.target.value)}
                className="w-full h-9 px-2 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface text-xs focus:outline-none cursor-pointer"
              >
                <option>Morning 09:00 AM - 11:30 AM</option>
                <option>Afternoon 02:00 PM - 04:30 PM</option>
                <option>Evening 06:00 PM - 08:30 PM</option>
                <option>Weekend Batch (Sat & Sun)</option>
              </select>
            </div>
          </div>

          {/* Syllabus / Notes */}
          <div>
            <label className="block font-semibold uppercase text-[10px] text-outline mb-1">
              Curriculum Summary (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Key modules, industry certification, and prerequisites..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-outline-variant/15">
            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigate('courses-batches');
              }}
              className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <span>Manage in Courses Hub</span>
              <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg text-outline hover:text-on-surface text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
                <span>Create Course</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseModal;
