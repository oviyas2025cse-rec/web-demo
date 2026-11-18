import React from 'react';

interface ServiceDiagramProps {
  type: 'elv' | 'electrical' | 'it' | 'cabling' | 'maintenance';
}

export const ServiceDiagram: React.FC<ServiceDiagramProps> = ({ type }) => {
  if (type === 'elv') {
    return (
      <svg
        viewBox="0 0 460 190"
        className="w-full h-auto"
        role="img"
        aria-label="ELV Systems integration topology diagram"
      >
        <rect width="460" height="190" rx="12" fill="rgba(7, 11, 34, 0.78)" stroke="rgba(34,211,238,0.24)" />
        {/* Headend / Core */}
        <rect x="175" y="64" width="110" height="62" rx="10" fill="rgba(42, 20, 99, 0.9)" stroke="#22D3EE" strokeWidth="1.6" />
        <text x="230" y="92" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
          ELV CORE
        </text>
        <text x="230" y="109" textAnchor="middle" fill="#7DD3FC" fontSize="9" fontFamily="IBM Plex Mono, monospace">
          &lt;50V AC / &lt;120V DC
        </text>

        {/* Connected Subsystems */}
        {[
          { x: 24, y: 24, label: '4K SMATV / MATV', path: 'M 124 44 L 175 82' },
          { x: 24, y: 126, label: 'CCTV & Access', path: 'M 124 146 L 175 110' },
          { x: 336, y: 24, label: 'BMS / BAS / PA', path: 'M 336 44 L 285 82' },
          { x: 336, y: 126, label: 'Intercom & Parking', path: 'M 336 146 L 285 110' },
        ].map((node) => (
          <g key={node.label}>
            <path d={node.path} stroke="#22D3EE" strokeWidth="1.6" className="animate-signal-flow" fill="none" />
            <rect x={node.x} y={node.y} width="100" height="40" rx="8" fill="rgba(16, 26, 68, 0.9)" stroke="rgba(167,139,250,0.45)" />
            <text x={node.x + 50} y={node.y + 24} textAnchor="middle" fill="#E6F4FF" fontSize="9.5" fontWeight="600">
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  if (type === 'electrical') {
    return (
      <svg
        viewBox="0 0 460 190"
        className="w-full h-auto"
        role="img"
        aria-label="Electrical and mechanical power distribution diagram"
      >
        <rect width="460" height="190" rx="12" fill="rgba(7, 11, 34, 0.78)" stroke="rgba(56,189,248,0.24)" />
        {[
          { x: 24, title: 'HV 11kV / 33kV', sub: 'Primary Feeder' },
          { x: 175, title: 'MSB & Standby', sub: 'UPS + Transfer' },
          { x: 326, title: 'Sub-Mains & Loads', sub: 'Lighting & M&E' },
        ].map((box, i) => (
          <g key={box.title}>
            <rect
              x={box.x}
              y="52"
              width="110"
              height="68"
              rx="10"
              fill={i === 1 ? 'rgba(37, 99, 235, 0.35)' : 'rgba(24, 24, 72, 0.85)'}
              stroke={i === 1 ? '#22D3EE' : 'rgba(167,139,250,0.4)'}
              strokeWidth="1.5"
            />
            <text x={box.x + 55} y="82" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontWeight="700">
              {box.title}
            </text>
            <text x={box.x + 55} y="100" textAnchor="middle" fill="#A5F3FC" fontSize="9" fontFamily="IBM Plex Mono, monospace">
              {box.sub}
            </text>
          </g>
        ))}
        <path d="M 134 86 L 175 86" stroke="#22D3EE" strokeWidth="2" className="animate-signal-flow" />
        <path d="M 285 86 L 326 86" stroke="#22D3EE" strokeWidth="2" className="animate-signal-flow" />
        {/* Earthing & Lightning protection bar */}
        <line x1="79" y1="150" x2="381" y2="150" stroke="#A78BFA" strokeWidth="1.5" strokeDasharray="4 4" />
        <text x="230" y="170" textAnchor="middle" fill="#C4B5FD" fontSize="9.5" fontFamily="IBM Plex Mono, monospace">
          EARTHING GRID · LIGHTNING PROTECTION · ENERGY SAVING
        </text>
      </svg>
    );
  }

  if (type === 'it') {
    return (
      <svg
        viewBox="0 0 460 190"
        className="w-full h-auto"
        role="img"
        aria-label="GPON optical networking and enterprise IT architecture diagram"
      >
        <rect width="460" height="190" rx="12" fill="rgba(7, 11, 34, 0.78)" stroke="rgba(167,139,250,0.28)" />
        <rect x="26" y="64" width="108" height="62" rx="10" fill="rgba(42,20,99,0.88)" stroke="#A78BFA" strokeWidth="1.5" />
        <text x="80" y="92" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
          GPON OLT
        </text>
        <text x="80" y="109" textAnchor="middle" fill="#C4B5FD" fontSize="9" fontFamily="IBM Plex Mono, monospace">
          Optical Core
        </text>

        <circle cx="222" cy="95" r="28" fill="rgba(14, 42, 82, 0.9)" stroke="#22D3EE" strokeWidth="1.8" />
        <text x="222" y="99" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="700">
          SECURITY
        </text>

        <path d="M 134 95 L 194 95" stroke="#22D3EE" strokeWidth="2" className="animate-signal-flow" />

        {[
          { y: 26, label: 'Managed Switching' },
          { y: 76, label: 'Enterprise Wi-Fi' },
          { y: 126, label: 'BMS & IT Support' },
        ].map((node) => (
          <g key={node.label}>
            <path d={`M 250 95 L 308 ${node.y + 18}`} stroke="#38BDF8" strokeWidth="1.6" className="animate-signal-flow" fill="none" />
            <rect x="308" y={node.y} width="126" height="36" rx="8" fill="rgba(16, 26, 68, 0.9)" stroke="rgba(56,189,248,0.45)" />
            <text x="371" y={node.y + 22} textAnchor="middle" fill="#E6F4FF" fontSize="10" fontWeight="600">
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  if (type === 'cabling') {
    return (
      <svg
        viewBox="0 0 460 190"
        className="w-full h-auto"
        role="img"
        aria-label="Structured cabling layers for fiber optic, Cat6, SMATV, and telephony"
      >
        <rect width="460" height="190" rx="12" fill="rgba(7, 11, 34, 0.78)" stroke="rgba(34,211,238,0.24)" />
        {[
          { y: 34, label: 'Fiber Optic Backbone', color: '#22D3EE' },
          { y: 74, label: 'Cat6 Network Cabling', color: '#60A5FA' },
          { y: 114, label: 'SMATV Coaxial Riser', color: '#A78BFA' },
          { y: 154, label: 'Telephony & Certification', color: '#14B8A6' },
        ].map((lane) => (
          <g key={lane.label}>
            <text x="24" y={lane.y + 4} fill="#E6F4FF" fontSize="10" fontWeight="600">
              {lane.label}
            </text>
            <line x1="176" y1={lane.y} x2="364" y2={lane.y} stroke={lane.color} strokeWidth="2.4" className="animate-signal-flow" />
            <rect x="374" y={lane.y - 11} width="62" height="22" rx="6" fill="rgba(16,26,68,0.9)" stroke={lane.color} />
            <text x="405" y={lane.y + 3} textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontFamily="IBM Plex Mono, monospace">
              TESTED
            </text>
          </g>
        ))}
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 460 190"
      className="w-full h-auto"
      role="img"
      aria-label="24/7 Preventive Maintenance SLA lifecycle diagram"
    >
      <rect width="460" height="190" rx="12" fill="rgba(7, 11, 34, 0.78)" stroke="rgba(20,184,166,0.32)" />
      <circle cx="230" cy="95" r="56" fill="none" stroke="rgba(34,211,238,0.25)" strokeWidth="2" />
      <circle cx="230" cy="95" r="56" fill="none" stroke="#22D3EE" strokeWidth="2.4" className="animate-signal-flow" />
      <text x="230" y="91" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="800">
        24/7
      </text>
      <text x="230" y="108" textAnchor="middle" fill="#22D3EE" fontSize="9" fontFamily="IBM Plex Mono, monospace">
        SLA CARE
      </text>

      {[
        { x: 24, y: 24, label: 'Scheduled SLA' },
        { x: 320, y: 24, label: 'Remote 24/7' },
        { x: 24, y: 128, label: 'On-Site Dispatch' },
        { x: 320, y: 128, label: 'Warranty Cover' },
      ].map((item) => (
        <g key={item.label}>
          <rect x={item.x} y={item.y} width="116" height="36" rx="8" fill="rgba(22, 34, 86, 0.9)" stroke="rgba(56,189,248,0.42)" />
          <text x={item.x + 58} y={item.y + 22} textAnchor="middle" fill="#E6F4FF" fontSize="9.5" fontWeight="600">
            {item.label}
          </text>
        </g>
      ))}
    </svg>
  );
};
