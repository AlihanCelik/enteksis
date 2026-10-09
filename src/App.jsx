import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import WorkflowSteps from './components/WorkflowSteps';
import Calculator from './components/Calculator';
import LeadForm from './components/LeadForm';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import SubmissionsViewer from './components/SubmissionsViewer';
import { fetchLeads } from './utils/api';

export default function App() {
  const [submissionsModalOpen, setSubmissionsModalOpen] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);

  const refreshCount = async () => {
    const res = await fetchLeads();
    if (res.success && res.data) {
      setSubmissionCount(res.data.length);
    }
  };

  useEffect(() => {
    refreshCount();
  }, []);

  const handleFormSubmissionSuccess = () => {
    refreshCount();
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        onOpenSubmissions={() => setSubmissionsModalOpen(true)}
        submissionCount={submissionCount}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <Features />
        <WorkflowSteps />
        <Calculator />
        <LeadForm onSubmissionSuccess={handleFormSubmissionSuccess} />
        <Testimonials />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer onOpenSubmissions={() => setSubmissionsModalOpen(true)} />

      {/* Interactive Server Inspector Drawer / Modal */}
      <SubmissionsViewer
        isOpen={submissionsModalOpen}
        onClose={() => setSubmissionsModalOpen(false)}
        onCountChange={(newCount) => setSubmissionCount(newCount)}
      />
    </div>
  );
}
