import type { AboutTeamMember } from '../../types/about';

export default function TeamMemberCard({ name, role, bio, image, linkedin }: AboutTeamMember) {
  return (
    <div className="rounded-3xl bg-lofty-gray p-7 shadow-md transition-transform active:scale-[0.98] dark:bg-lofty-purple-700 sm:p-8 sm:shadow-none">
      <img src={image} alt={name} className="h-24 w-24 rounded-full object-cover" />
      <div className="mt-5 flex items-center gap-3">
        <h3 className="text-xl font-bold text-lofty-purple-600 dark:text-lofty-gray">{name}</h3>
        {linkedin ? (
          <a href={linkedin} target="_blank" rel="noreferrer" aria-label={`${name} on LinkedIn`}>
            <img
              src="/assets/about/linkedin.7defd339fd92d3e5fa034b24a5f10ed6.svg"
              alt=""
              className="h-5 w-5 opacity-60 transition-opacity hover:opacity-100"
            />
          </a>
        ) : null}
      </div>
      <p className="mt-1 text-xs uppercase tracking-wider text-lofty-purple-600/55 dark:text-lofty-gray/55">{role}</p>
      <p className="mt-4 text-sm leading-6 text-lofty-purple-600/75 dark:text-lofty-gray/75">{bio}</p>
    </div>
  );
}
