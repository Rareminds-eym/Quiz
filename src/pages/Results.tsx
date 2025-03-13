import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, BookOpen, Award } from 'lucide-react';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };

  // Calculate percentage
  const percentage = Math.round((score / totalQuestions) * 100);

  // Generate feedback based on performance
  const getFeedback = () => {
    const performance = percentage >= 80 ? 'excellent' : percentage >= 60 ? 'good' : 'needs improvement';

    const feedbackMap = {
      excellent: 'Outstanding understanding of the Metaverse! You have demonstrated exceptional knowledge in AR, VR, AI, IoT, Blockchain, and their industrial applications. Your grasp of how emerging technologies shape the future is commendable!',
      good: 'Good grasp of the Metaverse concepts. You have a solid understanding of key technologies, but consider reviewing deeper aspects such as AI-driven automation, digital twins, and blockchain applications in industries.',
      'needs improvement': 'Your understanding of the Metaverse needs improvement. Focus on key topics such as AR, VR, AI, Blockchain, and IoT. Strengthen your knowledge of how these technologies integrate into industrial applications for a more comprehensive understanding.',
    };

    return feedbackMap[performance];
  };

  return (
    <div className="min-h-screen bg-pattern-chemistry flex items-center justify-center py-12">
      <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-12 sm:px-8 text-center">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-white bg-opacity-20 mb-6">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white font-serif mb-4">Assessment Complete!</h2>
            <p className="text-xl text-white text-opacity-90">
              You've completed the Metaverse Course
            </p>
          </div>

          {/* Results */}
          <div className="px-6 py-8 sm:px-8">
            {/* Feedback */}
            <div className="mb-8 text-center">
              <h3 className="text-xl font-medium text-gray-900 mb-4 flex items-center justify-center font-serif">
                <Award className="h-6 w-6 text-blue-600 mr-2" />
                Performance Analysis
              </h3>
              <p className="text-gray-600 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 max-w-2xl mx-auto">
                {getFeedback()}
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
