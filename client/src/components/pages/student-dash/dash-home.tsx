import React from "react";
import { Tooltip, Typography } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, ChartTooltip, Legend);

type Props = {};

const DashHome: React.FC = (props: Props) => {
  // Hardcoded student name
  const studentName = "Student";

  const quizData = {
    labels: ["Correct", "Wrong", "Not Answered"],
    datasets: [
      {
        data: [50, 30, 20], // Replace with actual data
        backgroundColor: ["#4CAF50", "#F44336", "#9E9E9E"],
        hoverBackgroundColor: ["#66BB6A", "#E57373", "#BDBDBD"],
      },
    ],
  };

  const courseData = {
    labels: ["DSA", "Cloud", "DBMS"],
    datasets: [
      {
        label: "Performance",
        data: [85, 70, 95], // Replace with actual data
        backgroundColor: ["#3F51B5", "#2196F3", "#03A9F4"],
        hoverBackgroundColor: ["#5C6BC0", "#42A5F5", "#29B6F6"],
      },
    ],
  };

  return (
    <div className='w-full flex justify-center items-center'>
      <div className='w-11/12'>
        <div>
          <div className='pt-5 pb-2 w-full'>
            <h2 className='text-3xl font-semibold text-customFontColorBlack'>
              Welcome back, {studentName}
            </h2>
          </div>
          <div className='mb-2 pt-3'>
            <h5 className='text-customFontColorBlack font-semibold'>
              MY PERFORMANCE
            </h5>
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-x-10 mb-5'>
          <div className='border md:w-8/12 w-full bg-white rounded-md border-gray-300 p-5'>
            <h2 className='text-2xl font-semibold text-customFontColorBlack mb-5'>
              Course Performance
            </h2>
            <div className='w-full'>
              <Bar data={courseData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className='border md:w-4/12 w-full bg-white rounded-md border-gray-300 p-5'>
            <div className='flex items-center mb-5'>
              <h2 className='text-customFontColorBlack font-bold flex-grow'>
                My weekly goal
              </h2>
              <Tooltip
                content={
                  <div className='w-80'>
                    <Typography color='white' className='font-medium'>
                      Info
                    </Typography>
                    <Typography
                      variant='small'
                      color='white'
                      className='font-normal opacity-80'
                    >
                      To achieve your goal for a day, complete any lectures
                    </Typography>
                  </div>
                }
              >
                <InformationCircleIcon
                  strokeWidth={2}
                  className='text-blue-gray-500 w-5 h-5 cursor-pointer'
                />
              </Tooltip>
            </div>

            <div className='bg-gray-200 rounded-md p-4'>
              <h2 className='text-sm font-light'>
                Make it a habit! Each day that you complete a lecture, practice
                with a lab, or take a quiz or exam you'll build your learning
                streak.
              </h2>
            </div>
            <div className='flex justify-center mt-5'>
              <button className='bg-blue-500 hover:bg-blue-600 rounded-md text-white p-2'>
                Set yourself a goal
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-x-10 mb-5'>
          <div className='border md:w-8/12 w-full bg-white rounded-md border-gray-300 p-5'>
            <h2 className='text-2xl font-semibold text-customFontColorBlack mb-5'>
              Quiz Performance
            </h2>
            <div className='w-full'>
              <div style={{ height: '250px' }}>
                <Pie data={quizData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashHome;
