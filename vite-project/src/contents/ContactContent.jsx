import React, { useState } from 'react';
import { Mail, Send, Info, Check, Copy } from 'lucide-react';
import { SoundManager } from '../utils/SoundManager';

export default function ContactContent() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });

  const [isSending, setIsSending] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const directEmail = "hindujasimhadri@gmail.com";

  const handleCopyEmail = () => {
    SoundManager.playSuccess();
    navigator.clipboard.writeText(directEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      SoundManager.playError();
      alert("System Warning: Please fill in your Email and Message!");
      return;
    }

    SoundManager.playClick();
    setIsSending(true);

    // Format native mail client URI
    const subjectLine = formData.subject || 'Inquiry from Retro Portfolio';
    const bodyContent = `Sender Address: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoUrl = `mailto:${directEmail}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(bodyContent)}`;
    
    // Redirect to native mail application
    window.location.href = mailtoUrl;

    // Trigger retro dialog confirmation shortly after redirection
    setTimeout(() => {
      setIsSending(false);
      setShowSuccessDialog(true);
      SoundManager.playSuccess();
      // Clear inputs
      setFormData({ email: '', subject: '', message: '' });
    }, 850);
  };

  return (
    <div className="space-y-6 font-sans relative">

      {/* Visual divider / grid container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

        {/* Left Side: Composer Form */}
        <form onSubmit={handleSubmit} className="md:col-span-7 space-y-4 border border-[#3c4233] bg-[#fdfbf7] p-4 rounded-sm shadow-[2px_2px_0px_0px_rgba(60,66,51,0.8)]">
          <div className="text-[10px] font-mono text-[#5c674e] font-bold border-b border-[#dfd8be] pb-1.5 mb-2 select-none uppercase tracking-wider flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#3c4233]" /> MAIL_COMPOSER.EXE
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-mono font-bold text-[#5c674e]">FROM (EMAIL):</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.address@domain.com"
              className="w-full text-xs font-mono px-3 py-2 bg-[#fdfbf7] border-2 border-[#3c4233] rounded-sm focus:border-[#5c674e] focus:outline-none pointer-events-auto"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-mono font-bold text-[#5c674e]">SUBJECT:</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Collaboration / Job Opportunity"
              className="w-full text-xs font-mono px-3 py-2 bg-[#fdfbf7] border-2 border-[#3c4233] rounded-sm focus:border-[#5c674e] focus:outline-none pointer-events-auto"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-mono font-bold text-[#5c674e]">MESSAGE_BODY:</label>
            <textarea
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Hi Hinduja! We'd love to work together on..."
              className="w-full text-xs font-mono px-3 py-2 bg-[#fdfbf7] border-2 border-[#3c4233] rounded-sm focus:border-[#5c674e] focus:outline-none resize-none scrollbar-retro pointer-events-auto"
            />
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="w-full retro-btn text-xs font-mono font-bold py-2 rounded-sm flex items-center justify-center gap-1.5 transition-all text-[#3c4233] pointer-events-auto disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            {isSending ? 'TRANSMITTING DATA...' : 'TRANSMIT_MAIL.BAT'}
          </button>
        </form>

        {/* Right Side: Retro Address Book */}
        <div className="md:col-span-5 space-y-4">
          <div className="border border-[#3c4233] bg-[#efe9d9] p-4 rounded-sm shadow-[2px_2px_0px_0px_rgba(60,66,51,0.8)] space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5c674e] border-b border-[#dfd8be] pb-2 flex items-center gap-1.5 select-none">
              <Info className="w-3.5 h-3.5 text-[#3c4233]" /> DIRECT DIRECTORY
            </h3>

            <div className="space-y-2 font-mono text-xs text-[#3c4233]">
              <p className="font-bold text-[#5c674e]">PRIMARY EMAIL:</p>

              <div className="flex gap-1">
                <input
                  type="text"
                  readOnly
                  value={directEmail}
                  className="flex-1 px-2.5 py-1 text-[10px] bg-[#fdfbf7] border border-[#3c4233] rounded-sm select-all outline-none"
                />
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2 py-1 bg-[#efe9d9] border border-[#3c4233] rounded-sm text-[#3c4233] hover:bg-[#e6dfcb] active:translate-y-px transition-all pointer-events-auto"
                  title="Copy to clipboard"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#5c674e]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="border-t border-[#dfd8be] pt-3 space-y-2 font-mono text-xs text-[#3c4233]">
              <p className="font-bold text-[#5c674e] select-none">SOCIAL CHANNELS:</p>
              <div className="grid grid-cols-1 gap-2">
                <a
                  href="https://www.linkedin.com/in/hinduja-simhadri-965419316/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => SoundManager.playClick()}
                  className="flex items-center gap-2 p-1.5 border border-transparent hover:border-[#3c4233] hover:bg-[#fdfbf7] rounded-sm transition-all pointer-events-auto"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#5c674e] stroke-none shrink-0">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>linkedin.com/in/hinduja-simhadri-965419316/</span>
                </a>
                <a
                  href="https://github.com/Hinduja-25"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => SoundManager.playClick()}
                  className="flex items-center gap-2 p-1.5 border border-transparent hover:border-[#3c4233] hover:bg-[#fdfbf7] rounded-sm transition-all pointer-events-auto"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#5c674e] stroke-none shrink-0">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span>github.com/Hinduja-25</span>
                </a>
                <a
                  href="https://x.com/HSimhadri71531"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => SoundManager.playClick()}
                  className="flex items-center gap-2 p-1.5 border border-transparent hover:border-[#3c4233] hover:bg-[#fdfbf7] rounded-sm transition-all pointer-events-auto"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#5c674e] stroke-none shrink-0">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>x.com/HSimhadri71531</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Classic Windows Success Dialogue Box Modal Overlay */}
      {showSuccessDialog && (
        <div className="absolute inset-0 bg-[#3c4233]/15 flex items-center justify-center p-4 z-50 pointer-events-auto">
          <div className="bg-[#efe9d9] border-2 border-[#3c4233] w-full max-w-sm rounded-sm shadow-[4px_4px_0px_0px_rgba(60,66,51,1)] overflow-hidden">
            {/* Header */}
            <div className="bg-[#5c674e] text-[#f2efe4] font-mono text-[11px] font-bold px-2 py-1 flex items-center justify-between border-b-2 border-[#3c4233]">
              <span>Information Message</span>
              <button
                onClick={() => {
                  SoundManager.playClick();
                  setShowSuccessDialog(false);
                }}
                className="w-4 h-4 bg-[#cc6a5c] border border-[#3c4233] text-[9px] text-[#f2efe4] flex items-center justify-center hover:bg-[#b85b4d] rounded-sm shadow-sm"
              >
                X
              </button>
            </div>
            {/* Body */}
            <div className="p-4 flex gap-3.5 items-start">
              <div className="w-8 h-8 rounded-full bg-[#5c674e] flex items-center justify-center shrink-0 border border-[#3c4233] text-[#f2efe4] shadow-sm select-none">
                i
              </div>
              <div className="font-mono text-xs text-[#3c4233] leading-relaxed space-y-1">
                <p className="font-bold">Transmission Complete!</p>
                <p className="text-[10px] text-[#5c674e]">Mail packets dispatched successfully into the ether. Elaine will respond shortly!</p>
              </div>
            </div>
            {/* Footer buttons */}
            <div className="bg-[#dfd8be] border-t border-[#3c4233]/30 px-3 py-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  SoundManager.playClick();
                  setShowSuccessDialog(false);
                }}
                className="px-5 py-1 text-xs font-mono font-bold retro-btn rounded-sm"
              >
                [ OK ]
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
