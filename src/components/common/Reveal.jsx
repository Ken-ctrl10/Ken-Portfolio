import useInView from "../../hooks/useInView";

/**
 * Wraps children in an element that fades and lifts into place the first time it
 * enters the viewport. The animation itself lives in global.css, keyed off the
 * data attributes; this component only decides when to flip them.
 *
 * `delay` staggers siblings in a grid (in ms).
 */
function Reveal({ children, delay = 0, as: Tag = "div", className, ...rest }) {
  const [ref, isInView] = useInView();

  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal=""
      data-revealed={isInView ? "true" : "false"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
