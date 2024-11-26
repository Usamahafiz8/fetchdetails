'use client';  // This marks this component as a client-side component

import { useEffect, useState } from 'react';

// Fetching the server-side details through an API or server-side function (we'll do it later via an API)
const fetchServerDetails = async () => {
  const response = await fetch('/api/server-details');
  const data = await response.json();
  return data;
};

export default function HomePage() {
  const [clientDetails, setClientDetails] = useState<any>(null);
  const [serverDetails, setServerDetails] = useState<any>(null);

  useEffect(() => {
    // Fetching client-side system details
    const fetchClientDetails = () => {
      const details = {
        browser: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenResolution: `${window.screen.width} x ${window.screen.height}`,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        cores: navigator.hardwareConcurrency || "Unknown",
    // @ts-ignore
        
        memory: navigator.deviceMemory || "Unknown",
      };
      setClientDetails(details);
    };

    fetchClientDetails();
    
    // Fetch server-side details after client details are set
    fetchServerDetails().then((data) => {
      setServerDetails(data);
    });

  }, []);

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1>System Settings</h1>

      {/* Client-Side Details */}
      <h2>Client-Side Details</h2>
      {clientDetails ? (
        <ul>
          <li><strong>Browser:</strong> {clientDetails.browser}</li>
          <li><strong>Platform:</strong> {clientDetails.platform}</li>
          <li><strong>Language:</strong> {clientDetails.language}</li>
          <li><strong>Screen Resolution:</strong> {clientDetails.screenResolution}</li>
          <li><strong>Time Zone:</strong> {clientDetails.timeZone}</li>
          <li><strong>CPU Cores:</strong> {clientDetails.cores}</li>
          <li><strong>Memory (GB):</strong> {clientDetails.memory}</li>
        </ul>
      ) : (
        <p>Loading client details...</p>
      )}

      {/* Server-Side Details */}
      <h2>Server-Side Details</h2>
      {serverDetails ? (
        <ul>
          <li><strong>IP Address:</strong> {serverDetails.ip}</li>
          <li><strong>Host:</strong> {serverDetails.host}</li>
        </ul>
      ) : (
        <p>Loading server details...</p>
      )}
    </div>
  );
}
