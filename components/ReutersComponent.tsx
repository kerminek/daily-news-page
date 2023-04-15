type Props = {
  reuters: any;
  from: number;
  to: number;
};

const ReutersComponent = (props: Props) => {
  const { reuters, from, to } = props;

  return (
    // px-1 to avoid outliering pixels in safari
    <div className="flex flex-col gap-y-5 sm:gap-y-10 text-sm sm:text-base px-1">
      {reuters.slice(from, to).map((item: any) => (
        <div className="space-y-2" key={item.title}>
          <div className="flex justify-between gap-5 text-gray-900 text-[0.875em] leading-none font-medium">
            <span className="line-clamp-1">{item.creator}</span>
            <span className="whitespace-nowrap">{new Date(item.pubDate).toDateString()}</span>
          </div>
          <a className="inline-block group space-y-1" href={item.link} target="_blank">
            <h3 className="text-[1.5em] leading-tight font-semibold text-gray-800 group-hover:text-zinc-500 transition ease-in">
              {item.title}
            </h3>
            <p className="text-[1em] text-gray-600" dangerouslySetInnerHTML={{ __html: item.contentSnippet }}></p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ReutersComponent;
