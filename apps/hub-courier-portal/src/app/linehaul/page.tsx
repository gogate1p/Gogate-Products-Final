'use client';

import { useState } from 'react';

interface LinehaulTrip {
  tripCode: string;
  driverName: string;
  driverPhone: string;
  vehicleNumber: string;
  vehicleType: string;
  originHub: string;
  destinationHub: string;
  departureTime: string;
  status: 'SCHEDULED' | 'IN_TRANSIT' | 'ARRIVED';
  bagsCount: number;
}

const initialTrips: LinehaulTrip[] = [
  {
    tripCode: 'TRIP-RTN-BOM-20261027',
    driverName: 'Suresh Patil',
    driverPhone: '+919899887766',
    vehicleNumber: 'MH-08-AG-9988',
    vehicleType: '14ft Refrigerated Container',
    originHub: 'Ratnagiri Agro Hub (HUB-RTN-01)',
    destinationHub: 'Mumbai Bhiwandi Linehaul Hub (HUB-BOM-01)',
    departureTime: 'Today at 06:30 AM',
    status: 'IN_TRANSIT',
    bagsCount: 4,
  },
  {
    tripCode: 'TRIP-RTN-PUN-20261027',
    driverName: 'Mahesh Jadhav',
    driverPhone: '+919877443322',
    vehicleNumber: 'MH-12-QX-4411',
    vehicleType: '20ft Insulated Truck',
    originHub: 'Ratnagiri Agro Hub (HUB-RTN-01)',
    destinationHub: 'Pune Hadapsar Express Branch (HUB-PUN-01)',
    departureTime: 'Today at 08:00 AM',
    status: 'IN_TRANSIT',
    bagsCount: 3,
  },
];

export default function LinehaulTripsPage() {
  const [trips] = useState<LinehaulTrip[]>(initialTrips);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Linehaul Transit & Middle-Mile Fleet</h2>
        <p className="text-sm text-slate-500 mt-1">
          Monitor heavy commercial vehicles and refrigerated containers moving fresh organic harvests from Ratnagiri to Mumbai and Pune sorting hubs.
        </p>
      </div>

      <div className="space-y-4">
        {trips.map((trip) => (
          <div key={trip.tripCode} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="font-mono text-sm font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                  {trip.tripCode}
                </span>
                <p className="text-xs text-slate-400 mt-1">Departed: {trip.departureTime}</p>
              </div>
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 animate-pulse">
                ● {trip.status.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4 text-xs">
              <div>
                <span className="text-slate-400">Assigned Driver</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{trip.driverName}</p>
                <p className="text-slate-500 font-mono">{trip.driverPhone}</p>
              </div>
              <div>
                <span className="text-slate-400">Truck / Vehicle</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5 font-mono">{trip.vehicleNumber}</p>
                <p className="text-slate-500">{trip.vehicleType}</p>
              </div>
              <div>
                <span className="text-slate-400">Hub Route</span>
                <p className="font-semibold text-slate-900 mt-0.5">{trip.originHub}</p>
                <p className="text-blue-600 font-semibold">➔ {trip.destinationHub}</p>
              </div>
              <div>
                <span className="text-slate-400">Bags / Consignment</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{trip.bagsCount} Sealed Bags Loaded</p>
                <p className="text-emerald-700 font-semibold">Temperature Sensor: 17.5°C</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
