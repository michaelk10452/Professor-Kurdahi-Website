import Header from "./components/Header"
import Image from "next/image"
import { Briefcase, Lightbulb, Mail, MapPin, GraduationCap, Award, Video, FileText, User } from "lucide-react"
import PublicationsList from "./components/PublicationsList"
import { Merriweather } from 'next/font/google'
import { faGoogleScholar } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

<FontAwesomeIcon icon={faGoogleScholar} className="w-6 h-6 text-blue-600 mr-4" />

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['700'],  // Using 700 (bold) since Merriweather's weight works well at this value
  display: 'swap',
});


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
      <section
          id="about"
          className="min-h-screen flex items-center"
          style={{ 
            background: 'linear-gradient(125deg, #00386c 0%, #004c8c 35%, #001428 100%)'
          }}
        >
          <div className="container mx-auto px-4 py-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
              <div className="md:col-span-4">
                <div className="relative overflow-hidden shadow-lg border-4 rounded-full aspect-square w-full max-w-md mx-auto" style={{ borderColor: '#f6aa0d' }}>
                  <Image
                    src="/fadi-kurdahi.png"
                    alt="Professor Fadi Kurdahi"
                    fill
                    quality={100}
                    priority
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 hover:scale-102"
                  />
                </div>
              </div>
              <div className="md:col-span-8">
                <h1 className={`text-3xl md:text-4xl mb-6 text-white ${merriweather.className}`}
                    style={{ 
                      letterSpacing: '0.01em'
                    }}>
                  Fadi Kurdahi
                </h1>
                <div className="space-y-6 text-gray-100">
                  <p className="text-lg">
                    A Distinguished Professor in the{" "}
                    <a href="https://engineering.uci.edu/dept/eecs" className="text-white hover:text-gray-200 underline underline-offset-4 decoration-1">
                      Department of Electrical Engineering and Computer Science
                    </a>{" "}
                    at UC Irvine since 1987, he currently serves as the Director of the{" "}
                    <a href="https://cecs.uci.edu" className="text-white hover:text-gray-200 underline underline-offset-4 decoration-1">
                      Center for Embedded and Cyber-Physical Systems (CECS)
                    </a>.{" "}
                    He also founded and leads the innovative and rapidly expanding{" "}
                    <a href="https://mecps.eecs.uci.edu" className="text-white hover:text-gray-200 underline underline-offset-4 decoration-1">
                      Master of Embedded and Cyber-Physical Systems (MECPS)
                    </a>{" "}
                    program to address the growing demand for expertise in these fields.
                  </p>
                  <p className="text-lg">
                    His research spans VLSI system design, digital systems automation, and embedded and cyber-physical systems. From 2017 to 2022, he served as Associate Dean of the{" "}
                    <a href="https://engineering.uci.edu" className="text-white hover:text-gray-200 underline underline-offset-4 decoration-1">
                      Samueli School of Engineering
                    </a>
                    , advancing its educational mission. He also holds a joint appointment in the{" "}
                    <a href="https://www.ics.uci.edu" className="text-white hover:text-gray-200 underline underline-offset-4 decoration-1">
                      Donald Bren School of Information and Computer Sciences
                    </a>.
                  </p>
                  <p className="text-lg">
                    An IEEE and AAAS Fellow, Prof. Kurdahi earned his M.S. & Ph.D. in Computer Engineering from USC and his undergraduate degree from the American University of Beirut. He remains passionate about advancing engineering education and preparing students for the rapidly evolving challenges of embedded and cyber-physical systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="appointments" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-10 text-center">Appointments</h2>

            {/* Academic Appointments */}
            <h3 className="text-3xl font-semibold mb-6">Academic</h3>
            <div className="space-y-6 mb-12">
              <div className="flex items-start">
                <User className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">Distinguished Professor</h3>
                  <p className="text-gray-600">Department of Electrical Engineering and Computer Science, University of California, Irvine, 2025 – present</p>
                </div>
              </div>

              <div className="flex items-start">
                <User className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">Director, Center for Embedded & Cyber-physical Systems (CECS)</h3>
                  <p className="text-gray-600">University of California, Irvine, 2012 – present</p>
                </div>
              </div>

              <div className="flex items-start">
                <User className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">Director, Professional Master of Embedded & Cyber-Physical Systems</h3>
                  <p className="text-gray-600">University of California, Irvine, 2022 – present</p>
                </div>
              </div>

              <div className="flex items-start">
                <User className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">Professor</h3>
                  <p className="text-gray-600">Department of Electrical Engineering and Computer Science, University of California, Irvine, 1998 – 2025</p>
                </div>
              </div>

              <div className="flex items-start">
                <User className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">Associate Dean for Graduate and Professional Studies</h3>
                  <p className="text-gray-600">Henry Samueli School of Engineering, University of California, Irvine, 2017 – 2022</p>
                </div>
              </div>

              <div className="flex items-start">
                <User className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">Associate Professor</h3>
                  <p className="text-gray-600">Department of Electrical Engineering and Computer Science, University of California, Irvine, 1993 – 1998</p>
                </div>
              </div>

              <div className="flex items-start">
                <User className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">Assistant Professor</h3>
                  <p className="text-gray-600">Department of Electrical Engineering and Computer Science, University of California, Irvine, 1987 – 1993</p>
                </div>
              </div>
            </div>

            {/* Industry Appointments */}
            <h3 className="text-3xl font-semibold mb-6">Industry</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <Briefcase className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">Chief Scientific Advisor</h3>
                  <p className="text-gray-600">The Blue Box Biomedical Solutions, Barcelona, Spain, 2019 – Present</p>
                </div>
              </div>

              <div className="flex items-start">
                <Briefcase className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">Founder, VP of Engineering and Chief Technical Officer</h3>
                  <p className="text-gray-600">Morpho Technologies, Irvine, CA, 2000 – 2002</p>
                </div>
              </div>

              <div className="flex items-start">
                <Briefcase className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">Consultant</h3>
                  <p className="text-gray-600">The United Nations Development Program (UNDP), 1995 – 1996</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-10 text-center">Educational Background</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <GraduationCap className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">Ph.D. in Computer Engineering</h3>
                  <p className="text-gray-600">
                    <a 
                      href="https://www.usc.edu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      University of Southern California
                    </a>, 1987
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <GraduationCap className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">M.S. in Computer Engineering</h3>
                  <p className="text-gray-600">
                    <a 
                      href="https://www.usc.edu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      University of Southern California
                    </a>, 1983
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <GraduationCap className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">B.E. in Electrical Engineering</h3>
                  <p className="text-gray-600">
                    <a 
                      href="https://www.aub.edu.lb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      American University of Beirut
                    </a>, 1981
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="awards" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-10 text-center">Awards and Honors</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Award className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">IEEE Fellow (2005)</h3>
                  <p className="text-gray-600">
                    The Institute of Electrical and Electronics Engineers
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Award className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">AAAS Fellow (2009)</h3>
                  <p className="text-gray-600">
                    The American Association for the Advancement of Science
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Award className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">Best Paper Award (2002)</h3>
                  <p className="text-gray-600">IEEE VLSI Transactions</p>
                </div>
              </div>
              <div className="flex items-start">
                <Award className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">Best Paper Award (2006)</h3>
                  <p className="text-gray-600">IEEE International Conference on Quality Electronic Design</p>
                </div>
              </div>
              <div className="flex items-start">
                <Award className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">Distinguished Alumnus Award (2008)</h3>
                  <p className="text-gray-600">The American University of Beirut</p>
                </div>
              </div>
              <div className="flex items-start">
                <Award className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">Best Paper Award (2016)</h3>
                  <p className="text-gray-600">IEEE Asia-Pacific Design Automation Conference</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="research" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-10 text-center">Research Interests</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "VLSI System Design and Design Automation", icon: Lightbulb },
                { title: "Embedded and Cyber-Physical Systems", icon: Lightbulb },
                { title: "Low-Power, Process-Aware Systems-on-Chip Design", icon: Lightbulb },
                { title: "Reconfigurable Computing", icon: Lightbulb },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <item.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="publications" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-10 text-center">Publications</h2>
            <PublicationsList />
          </div>
        </section>

        <section id="media" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-10 text-center">Media</h2>

            {/* Videos */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6">Videos</h3>
              <div className="space-y-4">
                <a
                  href="https://youtu.be/A6Hv6njW3CE?si=d-JrFE5oShYkYJ1N"
                  className="flex items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group"
                >
                  <Video className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 group-hover:text-blue-700" />
                  <span className="text-blue-600 group-hover:text-blue-700">
                    Computing Engineering Promotional Video
                  </span>
                </a>
                <a
                  href="https://youtu.be/DjzEbJ_6NeE?si=xceX7LWVcK7OZDiU"
                  className="flex items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group"
                >
                  <Video className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 group-hover:text-blue-700" />
                  <span className="text-blue-600 group-hover:text-blue-700">MProg Program Promotional Video</span>
                </a>
                <a
                  href="https://mecps.uci.edu/wp-content/uploads/2018/03/MECPS-Intro-to-Cyber-Physical-Systems-by-Fadi.mp4"
                  className="flex items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group"
                >
                  <Video className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 group-hover:text-blue-700" />
                  <span className="text-blue-600 group-hover:text-blue-700">MECPS Promotional Video</span>
                </a>
              </div>
            </div>

            {/* Articles */}
            <div>
              <h3 className="text-2xl font-semibold mb-6"> Articles & Reviews</h3>
              <div className="space-y-4">
                <a
                  href="https://www.cecs.uci.edu/event/prof-fadi-kurdahi-honored-at-waaaub-orange-county-chapter-annual-dinner/"
                  className="flex items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group"
                >
                  <FileText className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 group-hover:text-blue-700" />
                  <div>
                    <span className="text-blue-600 group-hover:text-blue-700 block mb-1">
                      Prof. Fadi Kurdahi Honored at WAAAUB Orange County Chapter Annual Dinner
                    </span>
                    <span className="text-sm text-gray-600">UCI CECS • 2025</span>
                  </div>
                </a>

                <a
                  href="https://elpais.com/cat/2021/05/10/tecnologia/1620657621_446415.html"
                  className="flex items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group"
                >
                  <FileText className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 group-hover:text-blue-700" />
                  <div>
                    <span className="text-blue-600 group-hover:text-blue-700 block mb-1">
                    Judit Giró, la jove catalana que utilitza intelligència artificial per detectar el càncer
                    </span>
                    <span className="text-sm text-gray-600">El País • 2024</span>
                  </div>
                </a>

                <a
                  href="https://engineering.uci.edu/news/2022/3/blue-box-wants-democratize-early-breast-cancer-detection"
                  className="flex items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group"
                >
                  <FileText className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 group-hover:text-blue-700" />
                  <div>
                    <span className="text-blue-600 group-hover:text-blue-700 block mb-1">
                      The Blue Box Wants to Democratize Early Breast Cancer Detection
                    </span>
                    <span className="text-sm text-gray-600">UCI Samueli School News • 2022</span>
                  </div>
                </a>
                <a
                  href="https://innovation.uci.edu/2021/01/whats-in-the-blue-box-breast-cancer-detection/"
                  className="flex items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group"
                >
                  <FileText className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 group-hover:text-blue-700" />
                  <div>
                    <span className="text-blue-600 group-hover:text-blue-700 block mb-1">
                      What’s in The Blue Box? Breast Cancer Detection
                    </span>
                    <span className="text-sm text-gray-600">UCI Beall Applied Innovation News • 2021</span>
                  </div>
                </a>
                <a
                  href="https://www.electromarket.com/noticia/22229/la-ingeniera-judit-giro-logra-el-james-dyson-award-con-su-detector-de.html"
                  className="flex items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group"
                >
                  <FileText className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 group-hover:text-blue-700" />
                  <div>
                    <span className="text-blue-600 group-hover:text-blue-700 block mb-1">
                      La ingeniera Judit Giró logra el James Dyson Award con su detector de cáncer de mama
                    </span>
                    <span className="text-sm text-gray-600">ElectroMarket • 2021</span>
                  </div>
                </a>

                <a
                  href="https://engineering.uci.edu/news/2020/12/samueli-school-researcher-wins-international-design-award"
                  className="flex items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group"
                >
                  <FileText className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 group-hover:text-blue-700" />
                  <div>
                    <span className="text-blue-600 group-hover:text-blue-700 block mb-1">
                      Samueli School Researcher Wins International Design Award
                    </span>
                    <span className="text-sm text-gray-600">UCI Samueli School News • 2020</span>
                  </div>
                </a>

                <a
                  href="https://www.dyson.es/james-dyson-award-2020"
                  className="flex items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group"
                >
                  <FileText className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 group-hover:text-blue-700" />
                  <div>
                    <span className="text-blue-600 group-hover:text-blue-700 block mb-1">
                      James Dyson Award 2020 Ganadores Internacionales
                    </span>
                    <span className="text-sm text-gray-600">James Dyson Foundation • 2020</span>
                  </div>
                </a>

                <a
                  href="https://www.espn.com/esports/story/_/id/26788969/uci-descraton-sharpens-college-league-legends-championship"
                  className="flex items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group"
                >
                  <FileText className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 group-hover:text-blue-700" />
                  <div>
                    <span className="text-blue-600 group-hover:text-blue-700 block mb-1">
                      UCI’s Descraton sharpens up for College League of Legends Championship
                    </span>
                    <span className="text-sm text-gray-600">ESPN • 2019</span>
                  </div>
                </a>

                <a
                  href="https://books.google.com/books?id=C5-l28dcz50C&lpg=PA1&pg=PA9#v=onepage&q&f=false"
                  className="flex items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group"
                >
                  <FileText className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 group-hover:text-blue-700" />
                  <div>
                    <span className="text-blue-600 group-hover:text-blue-700 block mb-1">
                      PC Magazine: Adaptive Chips
                    </span>
                    <span className="text-sm text-gray-600">PC Magazine • 1998</span>
                  </div>
                </a>

              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-10 text-center">Contact</h2>
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center mb-6">
                <Mail className="w-6 h-6 text-blue-600 mr-4" />
                <p className="text-lg">kurdahi@uci.edu</p>
              </div>
              <div className="flex items-center mb-6">
                <MapPin className="w-6 h-6 text-blue-600 mr-4" />
                <p className="text-lg">Engineering Hall, Room 3207, UC Irvine</p>
              </div>
              <div className="flex items-center mb-6">
                <svg 
                  className="w-6 h-6 text-blue-600 mr-4" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <a 
                  href="https://www.linkedin.com/in/fadikurdahi/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg text-blue-600 hover:text-blue-800 transition-colors"
                >
                  linkedin.com/in/fadikurdahi
                </a>
              </div>
              <div className="flex items-center mb-6">
                <FontAwesomeIcon icon={faGoogleScholar} className="w-6 h-6 text-blue-600 mr-4" />
                <a 
                  href="https://scholar.google.com/citations?user=AF8zRPwAAAAJ&hl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Google Scholar Profile
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Prof. Fadi Kurdahi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

