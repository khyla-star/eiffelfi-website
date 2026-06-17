import type { Stat } from '../../types/content';

type StatCardProps = Stat;

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="flex flex-col-reverse rounded-2xl border border-lofty-gray-300/70 bg-white/80 px-2 py-2.5 sm:px-4 sm:py-3">
      <dt className="mt-1 text-[10px] font-medium leading-tight text-lofty-gray-700 sm:text-xs">
        <span className="whitespace-pre-line sm:hidden">{label.replace(' ', '\n')}</span>
        <span className="hidden sm:inline">{label}</span>
      </dt>
      <dd className="text-lg font-bold text-lofty-purple-700 sm:text-2xl">{value}</dd>
    </div>
  );
}
