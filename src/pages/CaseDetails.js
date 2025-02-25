import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CaseDetails() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(`http://Your IP address:3000/api/reports/${id}`); //Put Your IP Address
        setReport(response.data);
        setStatus(response.data.status || '');
      } catch (error) {
        console.error('Error fetching report details:', error);
      }
    };

    fetchReport();
  }, [id]);

  const updateStatus = async (newStatus) => {
    try {
      const updatedReport = { ...report, status: newStatus };
      await axios.put(`http://Your IP address:3000/api/reports/${id}`, updatedReport);// Put Your IP Address
      setStatus(newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (!report) return <div className="flex justify-center items-center h-screen text-gray-500">Loading...</div>;

  return (
    <div className="bg-blue-50 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Case Details</h1>

        {/* Case Number Section */}
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-blue-600">Case Number: {report.id}</h2>
        </div>

        {/* Animal Details Section */}
        <div className="mb-4">
          <p className="text-gray-600"><strong>Animal Species:</strong> {report.animalSpecies}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600"><strong>Animal Type:</strong> {report.animalType}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600"><strong>Location:</strong> {report.location}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600"><strong>Animal Condition:</strong> {report.animalCondition}</p>
        </div>

        {/* Status Section */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Current Status: {status || 'No status set'}</h3>
        </div>

        {/* Action Buttons */}
        <div className="space-x-4 mt-6">
          <button
            onClick={() => updateStatus('Dispatch Team (Pet Animal)')}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Dispatch for Pet Animal
          </button>
          <button
            onClick={() => updateStatus('Dispatch Team (Wild Animal)')}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Dispatch for Wild Animal
          </button>
        </div>

        <div className="space-x-4 mt-4">
          <button
            onClick={() => updateStatus('Team Arrived')}
            className="bg-yellow-500 text-white py-2 px-6 rounded-md hover:bg-yellow-600 focus:outline-none"
          >
            Team Arrived
          </button>
          <button
            onClick={() => updateStatus('Rescue Ongoing')}
            className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 focus:outline-none"
          >
            Rescue Ongoing
          </button>
          <button
            onClick={() => updateStatus('Problem Resolved')}
            className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 focus:outline-none"
          >
            Animal Rescued
          </button>
        </div>
      </div>
    </div>
  );
}

export default CaseDetails;