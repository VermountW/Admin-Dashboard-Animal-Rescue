import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http:// Your IP address :3000/api/reports'); //put your IP Address
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  const filteredReports = reports.filter((report) => {
    return (
      report.id.toString().includes(searchTerm) ||
      report.animalSpecies.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="bg-blue-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Anomaly Reports Dashboard</h1>

        {/* Search Bar with Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute top-3 right-3 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        {/* No Reports Message */}
        {filteredReports.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No reports found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Report Card Layout */}
            {filteredReports.map((report) => (
              <div key={report.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Case Number: {report.id}</h3>
                <p className="text-lg text-gray-600 mb-4"><strong>Animal Species:</strong> {report.animalSpecies}</p>
                <p className="text-lg text-gray-600 mb-6"><strong>Location:</strong> {report.location}</p>
                <Link
                  to={`/case/${report.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

