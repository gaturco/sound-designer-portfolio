"use client";

import { useEffect, useState } from 'react';
import Authentication from './authentication';
import AdminPortal from '@/pages/AdminPortal';

export default function AdminPage() {
  console.log('AdminPage component rendered');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('useEffect hook started');
    // Check authentication via server
    const checkAuth = async () => {
      try {
        console.log('Checking auth...');
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch('/api/admin-check', {
          credentials: 'include', // Send cookies with request
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        
        console.log('Got response:', response.status);
        const text = await response.text();
        console.log('Response text:', text);
        const data = JSON.parse(text);
        console.log('Auth response:', data);
        setIsAuthenticated(data.isAuthenticated);
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsAuthenticated(false);
      } finally {
        console.log('Setting isLoading to false');
        setIsLoading(false);
      }
    };

    console.log('Calling checkAuth');
    checkAuth();
  }, []);

  if (isLoading) {
    console.log('Showing loading spinner');
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f5f5f5'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            animation: 'spin 1s linear infinite',
            width: '48px',
            height: '48px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#666' }}>Loading...</p>
        </div>
      </div>
    );
  }

  console.log('Rendering:', isAuthenticated ? 'AdminPortal' : 'Authentication');

  return isAuthenticated ? <AdminPortal /> : <Authentication />;
}
