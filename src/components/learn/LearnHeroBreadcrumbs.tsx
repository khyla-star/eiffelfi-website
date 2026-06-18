import LocalLink from '../common/LocalLink';

type LearnHeroBreadcrumbsProps = {
  items: Array<{ label: string; to?: string }>;
};

export default function LearnHeroBreadcrumbs({ items }: LearnHeroBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="learn-hero__breadcrumbs">
      <ol className="learn-hero__breadcrumbs-list">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="learn-hero__breadcrumbs-item">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.to ? (
              <LocalLink to={item.to} className="learn-hero__breadcrumbs-link">
                {item.label}
              </LocalLink>
            ) : (
              <span className="learn-hero__breadcrumbs-current">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
