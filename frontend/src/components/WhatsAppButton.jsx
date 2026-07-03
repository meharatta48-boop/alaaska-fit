import React, { useState, useEffect } from 'react';
import { PhoneCall } from 'lucide-react';
import { apiFetch } from '../utils/api.js';

export default function WhatsAppButton() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    apiFetch('/config/settings')
      .then(data => {
        if (data) setConfig(data);
      })
      .catch(() => {});
  }, []);

  const number = config?.whatsappNumber || '923001234567';
  const autoText = config?.whatsappConfig?.autoMessage || "Hello Al Aaska Fit, I'd like to get a manufacturing quote for my clothing line.";
  const show = config?.whatsappConfig?.showButton !== false;
  const position = config?.whatsappConfig?.position === 'left' ? 'left-6' : 'right-6';
  const buttonColor = config?.whatsappConfig?.buttonColor || '#25D366';

  if (!show) return null;

  const whatsappUrl = `https://wa.me/${number.replace(/\+/g, '')}?text=${encodeURIComponent(autoText)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ backgroundColor: buttonColor }}
      className={`fixed bottom-6 ${position} z-40 text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer group`}
      title={config?.whatsappConfig?.welcomeMessage || "Chat on WhatsApp"}
    >
      <PhoneCall size={20} className="group-hover:rotate-12 transition-transform" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 text-xs font-semibold tracking-wider uppercase transition-all duration-300 whitespace-nowrap">
        WhatsApp Sales
      </span>
    </a>
  );
}
