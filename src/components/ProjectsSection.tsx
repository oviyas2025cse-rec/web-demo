import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Expand, X, Layers } from 'lucide-react';
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  ProjectCategoryFilter,
} from '../data/siteData';
import { filterProjectsByCategory, wrapIndex } from '../utils/siteLogic';
import { ResilientImage } from './ResilientImage';
import { MagneticButton } from './MotionPrimitives';

interface ProjectsSectionProps {
  activeCategory: ProjectCategoryFilter;
  onCategoryChange: (category: ProjectCategoryFilter) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const filteredProjects = useMemo(
    () => filterProjectsByCategory(PROJECTS, activeCategory),
    [activeCategory]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: PROJECTS.length };
    for (const item of PROJECTS) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, []);

  const visibleProjects = useMemo(() => {
    if (activeCategory !== 'All' || showAll) return filteredProjects;
    return filteredProjects.slice(0, 18);
  }, [activeCategory, showAll, filteredProjects]);

  useEffect(() => {
    setLightboxIndex(null);
  }, [activeCategory]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : wrapIndex(prev, 1, filteredProjects.length)
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : wrapIndex(prev, -1, filteredProjects.length)
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, filteredProjects.length]);

  const activePhoto =
    lightboxIndex !== null ? filteredProjects[lightboxIndex] ?? null : null;

  return (
    <section id="projects-gallery" className="relative z-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter project photographs by sector"
          className="nimai-glass rounded-2xl p-2 sm:p-2.5 flex flex-wrap items-center gap-2 mb-10"
        >
          {PROJECT_CATEGORIES.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  onCategoryChange(category);
                  setShowAll(false);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#22D3EE] to-[#38BDF8] text-[#041024] font-semibold shadow-[0_6px_20px_rgba(34,211,238,0.3)]'
                    : 'text-[#C8D8F3] hover:text-white hover:bg-white/8'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`font-mono text-[11px] px-1.5 py-0.5 rounded-md ${
                    isSelected
                      ? 'bg-[#041024]/15 text-[#041024]'
                      : 'bg-white/8 text-[#9BB4DB]'
                  }`}
                >
                  {categoryCounts[category] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Asymmetric Editorial Showcase Grid with Smooth Category Transition */}
        <motion.div
          key={`${activeCategory}-${showAll}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {visibleProjects.map((project, idx) => {
            const isFeaturedWide =
              activeCategory === 'All' && (idx === 0 || idx === 5);
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                aria-label={`Inspect ${project.caption} (${project.category})`}
                className={`group relative rounded-2xl overflow-hidden bg-[#0B1033] border border-white/12 hover:border-cyan-300/55 shadow-[0_14px_38px_rgba(4,7,26,0.52)] transition-all duration-300 hover:-translate-y-1 text-left cursor-pointer h-[270px] sm:h-[295px] ${
                  isFeaturedWide ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className="relative w-full h-full overflow-hidden bg-[#070B24]">
                  <ResilientImage
                    src={project.src}
                    alt={`${project.caption} — ${project.category}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                  />

                  {/* Subtle permanent bottom gradient for crisp legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06091F]/94 via-[#090F2D]/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  {/* Expand badge */}
                  <span className="absolute top-3.5 right-3.5 w-9 h-9 rounded-xl bg-[#070B26]/82 border border-cyan-300/35 text-[#22D3EE] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105">
                    <Expand className="w-4 h-4" />
                  </span>

                  {/* Caption & Category */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 space-y-1">
                    <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#22D3EE]">
                      {project.category}
                    </p>
                    <p className="font-display text-sm sm:text-base font-semibold text-white line-clamp-1 group-hover:text-[#F5C451] transition-colors">
                      {project.caption}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* View All Toggle for All Category */}
        {activeCategory === 'All' && filteredProjects.length > 18 && (
          <div className="mt-10 text-center">
            <MagneticButton
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-white nimai-glass-cyan hover:border-cyan-300/60 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#22D3EE]" />
              <span>
                {showAll
                  ? 'Show Featured 18 Photographs'
                  : `View All ${filteredProjects.length} Verified Project Photographs`}
              </span>
            </MagneticButton>
          </div>
        )}
      </div>

      {/* Full-Screen Accessible Lightbox (Direct unmount — no AnimatePresence) */}
      {activePhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Project photo viewer: ${activePhoto.caption}`}
          onClick={() => setLightboxIndex(null)}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
            if (Math.abs(delta) > 45) {
              setLightboxIndex(
                wrapIndex(lightboxIndex, delta < 0 ? 1 : -1, filteredProjects.length)
              );
            }
            touchStartX.current = null;
          }}
          className="fixed inset-0 z-[80] bg-[#040618]/94 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8"
        >
          <motion.div
            key={activePhoto.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl flex flex-col gap-4"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#F5C451]">
                  {activePhoto.category} · {lightboxIndex + 1} / {filteredProjects.length}
                </p>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                  {activePhoto.caption}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close lightbox"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Canvas */}
            <div className="relative rounded-2xl overflow-hidden bg-[#070B22] border border-cyan-300/25 flex items-center justify-center min-h-[320px] max-h-[75vh]">
              <img
                src={activePhoto.src}
                alt={activePhoto.caption}
                className="max-h-[74vh] w-auto max-w-full object-contain"
              />

              <button
                type="button"
                onClick={() =>
                  setLightboxIndex(wrapIndex(lightboxIndex, -1, filteredProjects.length))
                }
                aria-label="Previous photograph"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-[#070B26]/85 hover:bg-[#132056] border border-cyan-300/30 text-white flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setLightboxIndex(wrapIndex(lightboxIndex, 1, filteredProjects.length))
                }
                aria-label="Next photograph"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-[#070B26]/85 hover:bg-[#132056] border border-cyan-300/30 text-white flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <p className="text-center text-xs font-mono text-[#9BB4DB]">
              Use Left / Right arrow keys or swipe to browse · Press ESC to close
            </p>
          </motion.div>
        </div>
      )}
    </section>
  );
};
