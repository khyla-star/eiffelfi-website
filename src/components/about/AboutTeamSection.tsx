import TeamMemberCard from './TeamMemberCard';
import { aboutTeam } from '../../data/about';

export default function AboutTeamSection() {
  return (
    <section className="bg-white py-14 dark:bg-lofty-purple-800 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        <h2 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-lofty-purple-600 dark:text-lofty-gray md:text-6xl">
          {aboutTeam.title} <span className="text-lofty-purple">{aboutTeam.titleHighlight}</span>
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {aboutTeam.members.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
