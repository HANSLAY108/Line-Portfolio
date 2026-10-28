import type { Education } from "@/lib/types";

interface JourneyTimelineProps {
  educations: Education[];
}

export default function JourneyTimeline({ educations }: JourneyTimelineProps) {
  return (
    <div className="relative border-l-2 border-border/80 pl-6 sm:pl-10 space-y-12 lg:space-y-16 ml-3 sm:ml-6">
      {educations.map((edu, idx) => (
        <div key={edu.id} className="relative group">
          {/* Timeline Node Dot */}
          <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent bg-background transition-transform duration-300 group-hover:scale-125 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-accent" />
          </div>

          <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-xs transition-all duration-300 hover:border-accent/40 hover:shadow-md">
            {/* Top row: Period, Institution, Honors */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-accent-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-text">
                  {edu.period}
                </span>
                {edu.location && (
                  <span className="text-[12px] text-muted-light font-medium">
                    · {edu.location}
                  </span>
                )}
              </div>

              {edu.grade && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-0.5 text-[11px] font-semibold text-emerald-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {edu.grade}
                </span>
              )}
            </div>

            {/* Degree Title & Institution */}
            <div className="mt-4">
              <h3 className="font-serif text-[1.6rem] sm:text-[1.85rem] font-medium leading-tight text-foreground">
                {edu.degree}
              </h3>
              <p className="mt-1 text-[14px] sm:text-[15px] font-medium text-accent-text">
                {edu.institution}
              </p>
              {edu.field_of_study && (
                <p className="mt-0.5 text-[13px] text-muted font-medium">
                  Specialization: {edu.field_of_study}
                </p>
              )}
            </div>

            {/* Narrative description */}
            {edu.description && (
              <p className="mt-4 text-[14px] sm:text-[15px] leading-[1.75] text-muted">
                {edu.description}
              </p>
            )}

            {/* Coursework & Research Tags */}
            {edu.coursework?.length > 0 && (
              <div className="mt-6 pt-5 border-t border-border/60">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-light mb-3">
                  Core Coursework &amp; Research Focus
                </p>
                <div className="flex flex-wrap gap-2">
                  {edu.coursework.map((course) => (
                    <span
                      key={course}
                      className="rounded-full border border-border bg-[#FAF7F5] px-3 py-1 text-[12px] font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
