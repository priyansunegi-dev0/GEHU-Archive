import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, FileText, Home } from "lucide-react"
import { SearchBar } from "./SearchBar"
import { FolderCard } from "./FolderCard"
import { Badge } from "@/components/ui/badge"

const COURSES = [
  "B PHARMA",
  "BA ENG",
  "BA JMC",
  "BBA",
  "BCA",
  "BCOM H",
  "BHM",
  "BSC ANIMATION",
  "BSC NURSING",
  "BTECH",
  "DIPLOMA",
  "MBA",
  "MCA",
  "MTECH",
]

const SEMESTERS = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"]

const SUBJECTS: Record<string, string[]> = {
  "Semester 1": ["Mathematics I", "Physics", "Chemistry", "English", "Basic Electronics"],
  "Semester 2": ["Mathematics II", "Engineering Drawing", "Data Structures", "Communication Skills", "Environmental Science"],
  "Semester 3": ["Algorithms", "OOP with Java", "Database Systems", "Discrete Mathematics", "Digital Electronics"],
  "Semester 4": ["Operating Systems", "Computer Networks", "Software Engineering", "Theory of Computation", "Web Technologies"],
  "Semester 5": ["Compiler Design", "Artificial Intelligence", "Machine Learning", "Cloud Computing", "Mobile Computing"],
  "Semester 6": ["Distributed Systems", "Information Security", "Big Data Analytics", "Elective I", "Elective II"],
  "Semester 7": ["Project Work I", "Elective III", "Elective IV", "Internship"],
  "Semester 8": ["Project Work II", "Elective V", "Seminar"],
}

const PDF_FILES = [
  "2023 Question Paper",
  "2022 Question Paper",
  "2021 Question Paper",
  "2020 Question Paper",
]

type Level = "courses" | "semesters" | "subjects" | "pdfs"

interface BreadcrumbItem {
  label: string
  level: Level
}

export function CourseGrid() {
  const [search, setSearch] = useState("")
  const [level, setLevel] = useState<Level>("courses")
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "GEHU Archive", level: "courses" },
    ...(selectedCourse ? [{ label: selectedCourse, level: "semesters" as Level }] : []),
    ...(selectedSemester ? [{ label: selectedSemester, level: "subjects" as Level }] : []),
    ...(selectedSubject ? [{ label: selectedSubject, level: "pdfs" as Level }] : []),
  ]

  const filteredCourses = COURSES.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  )

  const navigateTo = (breadcrumb: BreadcrumbItem) => {
    setLevel(breadcrumb.level)
    if (breadcrumb.level === "courses") {
      setSelectedCourse("")
      setSelectedSemester("")
      setSelectedSubject("")
    } else if (breadcrumb.level === "semesters") {
      setSelectedSemester("")
      setSelectedSubject("")
    } else if (breadcrumb.level === "subjects") {
      setSelectedSubject("")
    }
  }

  return (
    <section id="courses" className="py-16 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            Browse Papers
          </h2>
          <p className="text-muted-foreground text-sm">
            Select your course to access previous year question papers
          </p>
        </motion.div>

        {/* Search (only on courses level) */}
        {level === "courses" && (
          <div className="mb-8">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        )}

        {/* Breadcrumb */}
        {level !== "courses" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1.5 mb-6 flex-wrap"
          >
            {breadcrumbs.map((crumb, i) => (
              <div key={crumb.label} className="flex items-center gap-1.5">
                {i === 0 ? (
                  <button
                    onClick={() => navigateTo(crumb)}
                    className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Home className="h-3 w-3" />
                    <span>{crumb.label}</span>
                  </button>
                ) : i === breadcrumbs.length - 1 ? (
                  <span className="text-xs font-semibold text-foreground">{crumb.label}</span>
                ) : (
                  <button
                    onClick={() => navigateTo(crumb)}
                    className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {crumb.label}
                  </button>
                )}
                {i < breadcrumbs.length - 1 && (
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
            ))}
          </motion.div>
        )}

        {/* Grid Content */}
        <AnimatePresence mode="wait">
          {/* Courses Level */}
          {level === "courses" && (
            <motion.div
              key="courses"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filteredCourses.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground text-sm">
                  No courses found for &ldquo;{search}&rdquo;
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {filteredCourses.map((course, i) => (
                    <FolderCard
                      key={course}
                      name={course}
                      index={i}
                      onClick={() => {
                        setSelectedCourse(course)
                        setLevel("semesters")
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Semesters Level */}
          {level === "semesters" && (
            <motion.div
              key="semesters"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
            >
              {SEMESTERS.map((sem, i) => (
                <FolderCard
                  key={sem}
                  name={sem}
                  index={i}
                  onClick={() => {
                    setSelectedSemester(sem)
                    setLevel("subjects")
                  }}
                />
              ))}
            </motion.div>
          )}

          {/* Subjects Level */}
          {level === "subjects" && (
            <motion.div
              key="subjects"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              {(SUBJECTS[selectedSemester] || []).map((subject, i) => (
                <FolderCard
                  key={subject}
                  name={subject}
                  index={i}
                  onClick={() => {
                    setSelectedSubject(subject)
                    setLevel("pdfs")
                  }}
                />
              ))}
            </motion.div>
          )}

          {/* PDFs Level */}
          {level === "pdfs" && (
            <motion.div
              key="pdfs"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {PDF_FILES.map((file, i) => (
                <motion.div
                  key={file}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex items-center gap-3.5 rounded-xl border border-border bg-card p-4 shadow-sm hover:shadow-md hover:border-foreground/20 transition-all cursor-pointer"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted group-hover:bg-accent transition-colors flex-shrink-0">
                    <FileText className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground truncate">{file}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{selectedSubject} · {selectedSemester}</p>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">PDF</Badge>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
