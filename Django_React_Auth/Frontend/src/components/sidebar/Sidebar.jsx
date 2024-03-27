import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const Sidebar = ({ sectionIds }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState(null);

  const filteredSectionIds = sectionIds.filter((id) =>
    id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const scrollToSection = (targetSectionId) => {
    // Find the element you want to scroll to
    const section = document.getElementById(targetSectionId);

    // Scroll to the section with smooth behavior
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionIds.map((id) => document.getElementById(id));
      const scrollPosition = window.scrollY + window.innerHeight / 1;
      const currentSection = sections.find((section) => {
        const { top, bottom } = section.getBoundingClientRect();
        return top < scrollPosition && bottom < scrollPosition;
      });
      setActiveSection(currentSection ? currentSection.id : null);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, window.innerHeight]);

  return (
    <div className="flex w-full flex-col">
      <div className="mb-8 flex w-full">
        <div className="flex w-full items-center justify-center overflow-hidden rounded-md border border-black/10 bg-white dark:bg-black dark:text-white dark:border-white/15 duration-300">
          <label className="flex w-full items-center justify-start leading-none ">
            <div className="flex w-1/6 items-center justify-center">
              {searchQuery.trim().length > 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4 cursor-pointer text-black/70 hover:text-black/50 dark:text-white/70 dark:hover:text-white/50"
                  onClick={() => setSearchQuery("")}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="size-4 bg-transparent text-black/50 dark:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              )}
            </div>
            <input
              type="text"
              className=" bg-transparent py-3 text-sm leading-none outline-none duration-300 "
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col items-start justify-start">
        {filteredSectionIds.map((sectionId) => (
          <button
            key={sectionId}
            className={`hover:bg-neutral-150 w-full rounded-md border-black/10 p-3 text-start text-sm font-medium leading-none dark:hover:bg-zinc-950/90 ${sectionId === activeSection ? "bg-neutral-150 dark:bg-zinc-950" : "bg-neutral-50 dark:bg-transparent"
              }`}
            onClick={() => scrollToSection(sectionId)}
          >
            <span className="pointer-events-none !capitalize">{sectionId}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
