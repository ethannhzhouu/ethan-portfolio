"use client"

import type React from "react"
import { useState } from "react"

interface NotesProps {
  isDarkMode?: boolean
}

export default function Notes({ isDarkMode = true }: NotesProps) {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "about this project",
      content: 
`hi there, i'm Ethan. 🙋‍♂️

welcome to my project! this is a macOS-inspired portfolio website 
built with Next.js, React.js, TypeScript, and Tailwind

i created this interactive environment to showcase 
my experience and skills in a unique and engaging way

navigate through my portfolio as you would on a mac:

- dock:
      • contains most important apps for my portfolio
      • launchpad: access to all apps
      • open Safari to see experiences and skills

built with 🍵 and 😴.
`,
      date: "Today, 4:31 AM",
    },
    {
      id: 2,
      title: "apps & features",
      content: `mac-inspired portfolio apps:
built with TypeScript and React

𝗨𝘀𝗲𝗿 𝗜𝗻𝘁𝗲𝗿𝗳𝗮𝗰𝗲
- menu bar (top left to top right): 
      • last updated date
      • sleep / restart / shutdown / logout
      • name of currently focused app
      • battery display
      • spotlight search
      • control center
      • time display

- spotlight (top right): 
      • access to all apps

- control center (top right): 
      • toggle light and dark theme
      • brightness slider
      • wi-fi button (disabling wi-fi will disconnect safari)
      • bluetooth button (for aesthetic, no functionality)
      • enter fullscreen

𝗣𝗿𝗼𝗱𝘂𝗰𝘁𝗶𝘃𝗶𝘁𝘆 & 𝗦𝗼𝗰𝗶𝗮𝗹
• launchpad: customizable app launcher inspired by macOS

• safari: opens a website about my experiences and skills

• mail: opens gmail in a new tab

• notes: note-taking for project details

• terminal: interactive commands with my portfolio

• github: direct access to project source code

• linkedin: professional profile with experience

• resume: opens my resume with a downloadable PDF


𝗠𝗲𝗱𝗶𝗮 & 𝗘𝗻𝘁𝗲𝗿𝘁𝗮𝗶𝗻𝗺𝗲𝗻𝘁
• music: music player featuring 3 songs I'm listening to right now

• photos: 3 picture click slideshow of me

• youtube: links to youtube where you can watch videos

• weather: app with animated particles and mock weather data

• blackjack: try to reach as close to 21 versus the dealer

• loldodge: links to loldodgegame, dodge and attack enemies
`,
      date: "Yesterday, 1:20 AM",
    },
    {
      id: 3,
      title: "about me",
      content: `a bit about me:

education:
• graduated from UC San Diego c/o 2023 
B.S. in Data Science, minor in Cognitive Science

technical interests:
• building data-driven applications and scalable systems
• building side projects like this to learn new skills
• looking for new interesting work opportunities

what i do for fun:
• trying new restaurants and cafes
• getting better at cooking
• watching new movies, TV shows, and anime
• playing competitive games and sports
• learning new technologies and frameworks

currently learning: 
• data structures & algorithms / system design patterns
• frontend software development
• social media and content creation

contact:
email: xethanhzhou@gmail.com
LinkedIn: https://www.linkedin.com/in/ethannhzhouu/
`,
      date: "Yesterday, 8:20 PM",
    },
  ])

  const [selectedNoteId, setSelectedNoteId] = useState(1)
  const [editableContent, setEditableContent] = useState("")

  const selectedNote = notes.find((note) => note.id === selectedNoteId)

  const handleNoteSelect = (id: number) => {
    setSelectedNoteId(id)
    const note = notes.find((n) => n.id === id)
    if (note) {
      setEditableContent(note.content)
    }
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableContent(e.target.value)

    setNotes(
      notes.map((note) => {
        if (note.id === selectedNoteId) {
          return { ...note, content: e.target.value }
        }
        return note
      }),
    )
  }

  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const bgColor = isDarkMode ? "bg-neutral-900" : "bg-white"
  const sidebarBg = isDarkMode ? "bg-neutral-900" : "bg-gray-100"
  const borderColor = isDarkMode ? "bg-neutral-900" : "border-gray-200"
  const hoverBg = isDarkMode ? "hover:bg-neutral-700" : "hover:bg-gray-200"
  const selectedBg = isDarkMode ? "bg-neutral-700" : "bg-gray-300"

  return (
    <div className={`flex h-full ${bgColor} ${textColor}`}>
      {/* Sidebar */}
      <div className={`w-64 ${sidebarBg} border-r ${borderColor} flex flex-col min-h-0`}>
        <div className="p-3 border-b border-gray-700 flex justify-between items-center">
          <h2 className="font-medium">Notes</h2>
        </div>
        <div className="overflow-y-auto flex-1">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-3 cursor-pointer ${selectedNoteId === note.id ? selectedBg : hoverBg}`}
              onClick={() => handleNoteSelect(note.id)}
            >
              <h3 className="font-medium truncate">{note.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{note.date}</p>
              <p className={`text-sm mt-1 truncate ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {note.content.split("\n")[0].replace(/^#+ /, "")}
              </p>
            </div>
          ))}
        </div>

        {/* Contact information */}
        <div className={`p-3 border-t ${isDarkMode ? "border-neutral-100" : "border-gray-200"}`}>
          <div className="text-xs space-y-1">
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Contact me 😊</p>
            <a 
              href="mailto:xethanhzhou@gmail.com"
              className="block text-neutral-500 hover:underline"
            >
              xethanhzhou@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Note content */}
      <div className="flex-1 flex flex-col min-h-0">
        {selectedNote && (
          <>
            <div className={`p-3 border-b ${borderColor}`}>
              <h2 className="font-medium">{selectedNote.title}</h2>
              <p className="text-xs text-gray-500">{selectedNote.date}</p>
            </div>
            <div className="flex-1 p-4 overflow-hidden pr-1">
              <textarea
                className={`w-full h-full resize-none ${bgColor} ${textColor} focus:outline-none overflow-auto`}
                value={selectedNote.content}
                onChange={handleContentChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}