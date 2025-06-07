"use client"
import GoogleMap from './lib/GoogleMap';

export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
      <GoogleMap />
    </div>
  );
}
