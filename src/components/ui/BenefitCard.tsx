type BenefitCardProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export default function BenefitCard({ title, description, image, imageAlt }: BenefitCardProps) {
  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden rounded-[28px] border border-lofty-gray-300/70 bg-white p-5 shadow-cardLight lg:flex-row lg:items-stretch lg:gap-5 lg:p-0">
      <div className="order-1 flex shrink-0 justify-start lg:order-2 lg:w-1/3 lg:items-center lg:justify-center lg:px-4 lg:py-6">
        <img
          src={image}
          alt={imageAlt}
          className="h-auto w-[64px] shrink-0 object-contain object-left sm:w-[96px] lg:max-h-[128px] lg:w-full lg:max-w-[160px]"
          loading="lazy"
          decoding="async"
          width={234}
          height={256}
        />
      </div>
      <div className="order-2 flex min-w-0 flex-1 flex-col justify-center text-left lg:order-1 lg:w-2/3 lg:max-w-none lg:px-7 lg:py-8">
        <h3 className="text-lg font-semibold leading-snug text-lofty-purple-700 sm:text-xl">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-lofty-gray-700 sm:text-[15px] sm:leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
