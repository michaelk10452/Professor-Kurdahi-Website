"use client"

const LinkedInFeed = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold mb-4">Connect with Prof. Kurdahi</h3>
      <p className="mb-6 text-gray-600">Stay updated with Professor Kurdahi's latest research, publications, and professional activities on LinkedIn</p>
      <a 
        href="https://www.linkedin.com/in/fadikurdahi/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-6 py-3 bg-[#0077b5] text-white rounded-lg hover:bg-[#006396] transition-colors"
      >
        <svg 
          className="w-6 h-6 mr-2" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
        View LinkedIn Profile
      </a>
      <div className="mt-4 text-sm text-gray-500">
        Connect with Prof. Kurdahi to follow his professional network and stay informed about UCI's Center for Embedded and Cyber-Physical Systems
      </div>
    </div>
  );
};

export default LinkedInFeed;