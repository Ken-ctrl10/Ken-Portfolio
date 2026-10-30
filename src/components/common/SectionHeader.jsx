function SectionHeader({
  containerClassName,
  kickerClassName,
  subtitleClassName,
  kicker,
  title,
  titleId,
  subtitle,
}) {
  return (
    <header className={containerClassName}>
      <p className={kickerClassName}>{kicker}</p>
      <h2 className="section-title" id={titleId}>
        {title}
      </h2>
      <p className={subtitleClassName}>{subtitle}</p>
    </header>
  );
}

export default SectionHeader;
