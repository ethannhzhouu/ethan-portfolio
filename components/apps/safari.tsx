"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight, RefreshCw, Home, Star, Plus, Search, Wifi } from "lucide-react"

interface SafariProps {
  isDarkMode?: boolean
}

export default function Safari({ isDarkMode = true }: SafariProps) {
  const [wifiEnabled, setWifiEnabled] = useState(true)

  useEffect(() => {
    const checkWifiStatus = () => {
      const status = localStorage.getItem("wifiEnabled")
      setWifiEnabled(status === null ? true : status === "true")
    }
    checkWifiStatus()
    const interval = setInterval(checkWifiStatus, 1000)
    return () => clearInterval(interval)
  }, [])

  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const bgColor = isDarkMode ? "bg-neutral-900" : "bg-white"
  const toolbarBg = isDarkMode ? "bg-neutral-900" : "bg-gray-100"
  const inputBg = isDarkMode ? "bg-neutral-900" : "bg-gray-200"
  const borderColor = isDarkMode ? "border-neutral-700" : "border-gray-200"
  const cardBg = isDarkMode ? "bg-neutral-800" : "bg-gray-100"

  const NoInternetView = () => (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className={`w-24 h-24 mb-6 flex items-center justify-center rounded-full ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`}>
        <Wifi className={`w-12 h-12 ${isDarkMode ? "text-gray-600" : "text-gray-500"}`} />
      </div>
      <h2 className={`text-xl font-semibold mb-2 ${textColor}`}>You Are Not Connected to the Internet</h2>
      <p className={`text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"} mb-6`}>
        This page can't be displayed because your computer is currently offline.
      </p>
    </div>
  )

  return (
    <div className={`h-full flex flex-col ${bgColor} ${textColor}`}>
      <div className={`${toolbarBg} border-b ${borderColor} p-2 flex items-center space-x-2`}>
        <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <RefreshCw className="w-4 h-4" />
        </button>
        <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <Home className="w-4 h-4" />
        </button>

        <div className={`flex-1 flex items-center ${inputBg} rounded px-3 py-1`}>
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            value="https://ethannhzhouu.github.io"
            readOnly
            className={`w-full bg-transparent focus:outline-none text-sm ${textColor}`}
          />
        </div>

        <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <Star className="w-4 h-4" />
        </button>
      </div>

      <div className={`${toolbarBg} border-b ${borderColor} px-2 flex items-center`}>
        <div className={`px-3 py-1 text-sm rounded-t flex items-center ${isDarkMode ? "bg-black-900" : "bg-white"}`}>
          <span className="mr-2">Home</span>
          <button className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-gray-500">
            <span className="text-xs">×</span>
          </button>
        </div>
        <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {!wifiEnabled ? (
          <NoInternetView />
        ) : (
          <div className="p-8">
<h2 className="text-2xl font-bold mb-6">Skills</h2>
<div className={`p-6 rounded-lg ${cardBg} mb-8`}>
  <div className="grid grid-cols-3 gap-8">
    <div>
      <h3 className="font-semibold mb-2">Languages</h3>
      <p>Python, SQL, JavaScript / TypeScript, Java, HTML/CSS, R</p>
    </div>
    <div>
      <h3 className="font-semibold mb-2">Frameworks & Libraries</h3>
      <p>React.js, Next.js, Tailwind, Flask, Django, PyTorch, TensorFlow, NumPy, scikit-learn, Pandas, Dask</p>
    </div>
    <div>
      <h3 className="font-semibold mb-2">Industry Tools</h3>
      <p> Git, Tableau, PowerBI, AWS, PostgreSQL, Docker, Kubernetes, Apache Spark, Excel, Google Workspace</p>
    </div>
  </div>
</div>

            <h2 className="text-2xl font-bold mb-6">Experience</h2>
            <div className="grid grid-cols-1 gap-8 mb-8">
              {/* INSPYR/Apple */}
              <div className={`flex items-start p-6 rounded-lg ${cardBg}`}>
                <div className="w-24 h-24 bg-white rounded-lg flex-shrink-0 mr-6 overflow-hidden">
                  <img src="/insapple.png" alt="insapple" className="w-full h-full object-contain p-2" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">AI/ML Data Operations @ Apple - Project Manager </h3>
                  <p className="text-gray-500 mb-2">INSPYR Solutions • Cupertino, CA • July 2024 - July 2025</p>
                    <li>Managed terabytes of audio, text, and video data in S3 for ML evaluation and user accessibility improvements on Apple products</li>
                    <li>Spearheaded Name Detection data collection of 500,000+ assets aimed to develop features for deaf and impaired users to facilitate attention and communication</li>
                    <li>Developed Python automation for file search and detection processes, reducing manual tracker updates by 80% and optimizing data management workflows</li>
                    <li>Leveraged pandas to analyze metric data in Excel, generating reports that enhance project decisions and track status for clients</li>
                </div>
              </div>

              {/* Cognizant/Google */}
              <div className={`flex items-start p-6 rounded-lg ${cardBg}`}>
                <div className="w-24 h-24 bg-white rounded-lg flex-shrink-0 mr-6 overflow-hidden">
                  <img src="/coggoogle.png" alt="coggoogle" className="w-full h-full object-contain p-2" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">AR Data Collection @ Google - Technical Support Engineer </h3>
                  <p className="text-gray-500 mb-2">Cognizant • Mountain View, CA • November 2023 - June 2024</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Led 300+ data collection sessions for UX feedback and data, driving ML model improvements for Google AR glasses and headsets</li>
                    <li>Streamlined AR glasses collection workflows by troubleshooting operational issues, validating data, and updating documentation</li>
                    <li>Implemented metric automation in Google Sheets to record data and monitor key performance indicators (KPIs) for clients</li>
                  </ul>
                </div>
              </div>
                            {/* AI Camp*/}
              <div className={`flex items-start p-6 rounded-lg ${cardBg}`}>
                <div className="w-24 h-24 bg-white rounded-lg flex-shrink-0 mr-6 overflow-hidden">
                  <img src="/aicamp.png" alt="ai" className="w-full h-full object-contain p-2" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Data Science & Machine Learning Team Lead</h3>
                  <p className="text-gray-500 mb-2">AICamp • Palo Alto, CA • May 2023 - September 2023</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Developed a robust scraping pipeline to collect over 15,000+ contact data using LLMs, OpenAI API, and Google Search API.</li>
                    <li>Utilized Langchain and GPT-3.5 to efficiently extract dynamic/static HTML contact data, expanding customer outreach by 37.5%</li>
                    <li>Managed team of 5 interns to create data science and machine learning curriculum to deliver to 100+ students</li>
                    <li>Oversaw the development of 10+ language model projects made by students and achieved an average mentor rating of 9/10</li>
                  </ul>
                </div>
              </div>

              {/* AI Camp */}
              <div className={`flex items-start p-6 rounded-lg ${cardBg}`}>
                <div className="w-24 h-24 bg-white rounded-lg flex-shrink-0 mr-6 overflow-hidden">
                  <img src="/aicamp.png" alt="ai" className="w-full h-full object-contain p-2" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Data Science & Machine Learning Intern</h3>
                  <p className="text-gray-500 mb-2">AICamp • Palo Alto, CA • May 2022 - September 2022</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Mentored 100+ students on Python, web development, data science fundamentals, and machine learning concepts</li>
                    <li>Implemented a product review generator model by training my own GPT-2 model with Python and HuggingFace</li>
                    <li>Deployed review text generation model onto a website built with HTML, CSS, and Flask for 100+ users to demo</li>
                    <li>Developed a survey administration mobile app (similar to Google Forms) in React Native for students to demo</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">Projects</h2>
            <div className="grid grid-cols-1 gap-8 mb-8">
              {/* macOS Portfolio */}
              <div className={`flex items-start p-6 rounded-lg ${cardBg}`}>
                <div className="w-24 h-24 bg-white rounded-lg flex-shrink-0 mr-6 overflow-hidden">
                  <img src="/appleicon.png" alt="macOS Portfolio" className="w-full h-full object-contain p-2" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">macOS Portfolio</h3>
                  <p className="text-gray-500 mb-2">Personal Project • August 2025 • Next.js, React.js, TypeScript, Tailwind  • {" "}
  <a
    href="https://ethannhzhouu.vercel.app/"
    target="_blank"
    className={isDarkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"}
  >
    Website
  </a></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Implemented clean and responsive UI components such as launchpad, menu bar, control center, spotlight, and dock</li>
                    <li>Engineered interface with light/dark mode, brightness slider, and system lifecycle features (boot, sleep, shutdown)</li>
                    <li>Created 12 different apps to showcase my skills, experiences, projects, and creativity</li>
                  </ul>
                </div>
              </div>

              {/* Add more projects as needed */}
                            <div className={`flex items-start p-6 rounded-lg ${cardBg}`}>
                <div className="w-24 h-24 bg-white rounded-lg flex-shrink-0 mr-6 overflow-hidden">
                  <img src="/tigergraph.png" alt="tigergraph" className="w-full h-full object-contain p-2" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Fraud Detection in Ethereum Transaction Networks</h3>
                  <p className="text-gray-500 mb-2">UCSD Capstone Project with TigerGraph • January 2023 - March 2023 • Python, G-SQL, ML  •  {" "}
  <a
    href="https://drive.google.com/file/d/1bVt7uPKAqD1ME_K0zVTcBjMNZxnwPvFf/view"
    target="_blank"
    className={isDarkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"}
  >
    Article
  </a> / {" "}
  <a
    href="https://github.com/KazumaYamamoto2023/DSC180B-Q2-Project/tree/main"
    target="_blank"
    className={isDarkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"}
  >
    Github
  </a> / {" "}
  <a
    href="https://srgelinas.github.io/dsc180b_eth_fraud/"
    target="_blank"
    className={isDarkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"}
  >
    Website
  </a></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Implemented a Topology Adaptive Graph Convolutional Network (TA-GCN) with Python and G-SQL, with an average classification accuracy of ~82.2%, to predict if an Ethereum wallet in the transaction graph is fraudulent or not</li>
                    <li>Documented the effectiveness of graph-based algorithms and traditional ML algorithms to detect fraud in Ethereum networks</li>
                  </ul>
                </div>
              </div>
              {/* Add more projects as needed */}
            <div className={`flex items-start p-6 rounded-lg ${cardBg}`}>
                <div className="w-24 h-24 bg-white rounded-lg flex-shrink-0 mr-6 overflow-hidden">
                  <img src="/runbuggy.png" alt="ucsd innovation sprints" className="w-full h-full object-contain p-2" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Carbon Reduction with RunBuggy</h3>
<p className="text-gray-500 mb-2">
  UCSD Innovation Sprints Program • February 2022 - May 2022 • Python, SQL, Tableau  •{" "}
  <a
    href="https://thebasement.ucsd.edu/programs/i4x.html"
    target="_blank"
    className={isDarkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"}
  >
    Program
  </a>
</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Processed company data with Python and SQL to slash the number of trucks needed and overall mileage required to move cars</li>
                    <li>Optimized Runbuggy’s transporter network by building a k-neighbors model to classify CO2 emissions with a 96% accuracy</li>
                    <li>Presented project results to 30+ participants on showcase day with dashboards built in Python and Tableau.</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-6">Education</h2>
            <div className={`flex items-start p-6 rounded-lg ${cardBg}`}>
              <div className="w-24 h-24 bg-white rounded-lg flex-shrink-0 mr-6 overflow-hidden">
                <img src="/ucsd.png" alt="UC San Diego" className="w-full h-full object-contain p-2" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">University of California, San Diego</h3>
                <p className="text-gray-500 mb-2">B.S. in Data Science • Minor in Cognitive Science • 2019-2023</p>
                <p>Relevant Coursework: Advanced Data Structures and Algorithms, Data Mining & Web Scraping, Data Visualization, Machine Learning Algorithms, Object Oriented Algorithms and Design, 
                  SQL/NoSQL Databases, Systems for Scalable Analytics, Web Development</p>
              </div>
            </div>
          
          </div>
        )}
      </div>
    </div>
  )
}