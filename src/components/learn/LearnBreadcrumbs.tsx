import LocalLink from '../common/LocalLink';

type LearnBreadcrumbsProps = {
  items: Array<{ label: string; to?: string }>;
};

export default function LearnBreadcrumbs({ items }: LearnBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-body-secondary-color">
      <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.to ? (
              <LocalLink to={item.to} className="text-body-secondary-color no-underline hover:text-primary">
                {item.label}
              </LocalLink>
            ) : (
              <span className="text-body-primary-color">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
